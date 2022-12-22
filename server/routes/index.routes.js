const router = require('express').Router();
const authRoutes = require('./auth.routes');
const bikeRoutes = require('./bike.routes');
const usersRoutes = require('./users.routes');

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

router.use('/auth', authRoutes);
router.use('/bike', bikeRoutes);
router.use('/users', usersRoutes);

module.exports = router;
