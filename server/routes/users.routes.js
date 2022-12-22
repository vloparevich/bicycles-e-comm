const router = require('express').Router();
const usersArray = require('../bin/seeds-users');
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Bike = require('../models/Bike.model');

router.get('/bikes-with-users/:userId', async (req, res, next) => {
  const managerId = req.params.userId;
  const prepearedManagerId = mongoose.Types.ObjectId(managerId);
  let allTheBookingsWithUsers;
  try {
    const user = await User.findById(prepearedManagerId);
    if (user.isManager) {
      allTheBookingsWithUsers = await Bike.find();
    } else {
      allTheBookingsWithUsers = 'This request can be done by managere only';
    }

    res.status(200).json({ success: true, allTheBookingsWithUsers });
  } catch (err) {
    res.json(
      { success: false, message: 'Error while trying to seed the database' },
      err
    );
  }
});

router.get('/list-of-users/:userId', async (req, res, next) => {
  const managerId = req.params.userId;
  const prepearedManagerId = mongoose.Types.ObjectId(managerId);
  let allTheUsersButMe;
  try {
    const user = await User.findById(prepearedManagerId);
    if (user.isManager) {
      allTheUsersButMe = await User.find({ _id: { $nin: [managerId] } });
    } else {
      allTheUsersButMe = 'This request can be done by managere only';
    }

    res.status(200).json({ success: true, users: allTheUsersButMe });
  } catch (err) {
    res.json(
      { success: false, message: 'Error while trying to seed the database' },
      err
    );
  }
});

router.get('/get-my-rentals/:userId', async (req, res, next) => {
  const userId = req.params.userId;
  const preparedUserId = mongoose.Types.ObjectId(userId);

  try {
    const user = await User.findById(preparedUserId);
    user.reservedBikes.map((reservedBike) => {
      reservedBike.reservations = reservedBike.reservations.filter(
        (reservation) => {
          if (String(reservation.user?._id) === String(preparedUserId))
            return reservation;
        }
      );
      return reservedBike;
    });

    res.status(200).json({ success: true, userRentals: user });
  } catch (err) {
    res.json(
      { success: false, message: 'Error while trying to seed the database' },
      err
    );
  }
});

router.get(
  '/cancel-my-reservations/:userId/:bikeId',
  async (req, res, next) => {
    const userId = req.params.userId;
    const bikeId = req.params.bikeId;
    const preparedUserId = mongoose.Types.ObjectId(userId);
    const preparedBikeId = mongoose.Types.ObjectId(bikeId);

    try {
      let updatedUser = await User.findById(preparedUserId);

      const updatedReservedBikes = updatedUser.reservedBikes.filter(
        (reservation) => String(reservation.id) !== String(bikeId)
      );

      updatedUser = await User.findByIdAndUpdate(
        preparedUserId,
        {
          $set: { reservedBikes: [...updatedReservedBikes] },
        },
        { new: true }
      );

      const bike = await Bike.findById(preparedBikeId);
      const updatedBikeReservations = bike.reservations.filter(
        (reservation) => String(reservation.user._id) !== String(userId)
      );

      const updatedBike = await Bike.findByIdAndUpdate(
        preparedBikeId,
        {
          $set: { reservations: [...updatedBikeReservations] },
        },
        { new: true }
      );

      res
        .status(200)
        .json({ success: true, user: updatedUser, bikes: updatedBike });
    } catch (err) {
      res.json(
        { success: false, message: 'Error while trying to seed the database' },
        err
      );
    }
  }
);

router.post(`/update-user-details`, async (req, res) => {
  let { userId, fullName } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName: fullName,
      },
      { new: true }
    );
    return res.status(201).json({ success: true, updatedUser: updatedUser });
  } catch (err) {
    res.json(
      { success: false, user: 'Error while trying to add/update bicycle' },
      err
    );
  }
});

router.delete(
  `/delete-user-release-bikes/:managerId/:renterId`,
  async (req, res) => {
    const managerId = req.params.managerId;
    const renterId = req.params.renterId;
    const preparedRenterId = mongoose.Types.ObjectId(renterId);
    const preparedManagerId = mongoose.Types.ObjectId(managerId);

    try {
      let removedUser;
      const manager = await User.findById(preparedManagerId);
      if (manager.isManager) {
        removedUser = await User.findByIdAndDelete(preparedRenterId);
        await Bike.updateMany(
          {},
          { $pull: { reservations: { user: preparedRenterId } } },
          { safe: true, multi: true }
        );
      }

      return res.status(201).json({
        success: true,
        removedUser: removedUser,
      });
    } catch (err) {
      res.json(
        { success: false, user: 'Error while trying to add/update bicycle' },
        err
      );
    }
  }
);

router.get('/seed-users', async (req, res, next) => {
  try {
    const users = usersArray.map(async (user) => {
      const { fullName, username, password, isManager } = user;
      // const managerId = '63403bbb8b414aed54cce725';
      await User.create({ fullName, username, password, isManager });
    });

    const responseUsers = await Promise.all(users);
    res.status(200).json({ success: true, users: responseUsers });
  } catch (err) {
    res.json(
      {
        success: false,
        message: 'Error while trying to seed the database with users',
      },
      err
    );
  }
});

router.get('/list-of-rated-bikes-by/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const ratedBikes = user.ratedBikes;
    res.status(200).json({ success: true, ratedBikes: ratedBikes });
  } catch (err) {
    res.json(
      {
        success: false,
        message: 'Error while trying to get info about this user ' + userId,
      },
      err
    );
  }
});

module.exports = router;
