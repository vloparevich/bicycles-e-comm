const router = require('express').Router();

// ℹ️ Handles password encryption
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

const User = require('../models/User.model');
const Session = require('../models/Session.model');
const Token = require('../models/Token.model');

const isLoggedOut = require('../middleware/isLoggedOut');
const isLoggedIn = require('../middleware/isLoggedIn');

const genToken = require('./../utils/Utils');

router.post('/generate-manager-token', async (req, res) => {
  const { username } = req.body;
  const tokenId = genToken(10);
  try {
    const isExistingUser = await User.findOne({ username });
    if (isExistingUser) {
      return res.status(400).json({
        errorMessage:
          'Username you provided has already got the ID assigned, reach out to your admin...',
      });
    } else {
      await Token.create({ username, tokenId });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage: 'Token or Username ypu provided has already signed up',
      });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
});

router.get('/session', (req, res) => {
  if (!req.headers.authorization) {
    return res.json(null);
  }

  const accessToken = req.headers.authorization;

  Session.findById(accessToken)
    .populate('user')
    .then((session) => {
      if (!session) {
        return res.status(404).json({ errorMessage: 'Session does not exist' });
      }
      return res.status(200).json(session);
    });
});

router.post('/signup', isLoggedOut, async (req, res) => {
  const { fullName, username, password, isManager, managerId } = req.body;
  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide your username.' });
  }

  // if (password.length < 8) {
  //   return res.status(400).json({
  //     errorMessage: 'Your password needs to be at least 8 characters long.',
  //   });
  // }

  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json( {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */
  if (isManager) {
    console.info('ADMIN');
  }

  let canBeRegisteredAsManager = false;

  if (isManager) {
    const userAndItsToken = await Token.find({ tokenId: managerId });
    if (userAndItsToken.length === 1) {
      const foundUserUsername = userAndItsToken[0].username;
      if (foundUserUsername === username) {
        canBeRegisteredAsManager = true;
      }
    }
    if (!canBeRegisteredAsManager) {
      return res.status(400).json({
        errorMessage:
          "You are trying to register invalid username or manager's token",
      });
    }
  }
  User.findOne({ username }).then((found) => {
    if (found) {
      return res.status(400).json({ errorMessage: 'Username already taken.' });
    }

    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({
          fullName,
          username,
          password: hashedPassword,
          isManager: canBeRegisteredAsManager,
        });
      })
      .then((user) => {
        Session.create({
          user: user._id,
          createdAt: Date.now(),
        }).then((session) => {
          res.status(201).json({ user, accessToken: session._id });
        });
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              'Username need to be unique. The username you chose is already in use.',
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

router.post('/login', isLoggedOut, (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide your username.' });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: 'Your password needs to be at least 8 characters long.',
    });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ errorMessage: 'Wrong credentials.' });
      }

      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: 'Wrong credentials.' });
        }
        Session.create({ user: user._id, createdAt: Date.now() }).then(
          (session) => {
            return res.json({ user, accessToken: session._id });
          }
        );
      });
    })

    .catch((err) => {
      next(err);
      return res.status(500).render('login', { errorMessage: err.message });
    });
});

router.delete('/logout', isLoggedIn, (req, res) => {
  Session.findByIdAndDelete(req.headers.authorization)
    .then(() => {
      res.status(200).json({ message: 'User was logged out' });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
