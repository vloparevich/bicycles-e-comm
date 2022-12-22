const router = require('express').Router();
const bikesArray = require('../bin/seeds');

const mongoose = require('mongoose');

const User = require('../models/User.model');

const Bike = require('../models/Bike.model');

router.post(`/add-bike`, async (req, res) => {
  let { model, color, location, rating, isAvailable, pic, _id } = req.body;

  const reparedBikeId = mongoose.Types.ObjectId(_id);
  let postedBike = null;
  try {
    postedBike = await Bike.findByIdAndUpdate(reparedBikeId, {
      model,
      color,
      location,
      rating,
      isAvailable,
      pic,
    });
    if (!postedBike) {
      postedBike = await Bike.create({
        model,
        color,
        location,
        rating,
        isAvailable,
        pic,
      });
    }
    return res.status(201).json({ success: true, bike: postedBike });
  } catch (err) {
    res.json(
      { success: false, message: 'Error while trying to add/update bicycle' },
      err
    );
  }
});

router.get('/seed-bikes', async (req, res, next) => {
  try {
    const allTheBikesCreated = bikesArray.map(async (bike) => {
      const { model, color, location, rating, isAvailable, pic } = bike;
      await Bike.create({ model, color, location, rating, isAvailable, pic });
    });

    const responseBikes = await Promise.all(allTheBikesCreated);
    res.status(200).json({ success: true, bikes: responseBikes });
  } catch (err) {
    res.json(
      { success: false, message: 'Error while trying to seed the database' },
      err
    );
  }
});

router.get('/allthebikes', async (req, res) => {
  try {
    const bikes = await Bike.find({});
    res.status(200).json({ success: true, bikes: bikes });
  } catch (err) {
    res.json(
      { success: false, message: 'Error while trying to seed the database' },
      err
    );
  }
});

router.delete('/:bikeId', async (req, res) => {
  const { bikeId } = req.params;
  const prepearedbikeId = mongoose.Types.ObjectId(bikeId);
  try {
    const removedBike = await Bike.findByIdAndRemove(prepearedbikeId);
    // get all the users associated with this bike and clear their reservations
    const user = await User.updateMany(
      { reservedBikes: prepearedbikeId },
      { $pull: { reservedBikes: prepearedbikeId } }
    );

    res.status(200).json({
      success: true,
      removedBike: removedBike,
      user: user,
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'Bike has not been deleted',
      err,
    });
  }
});

router.post('/availability', async (req, res) => {
  const { bikeId, simpleDates } = req.body;
  try {
    const prepearedbikeId = mongoose.Types.ObjectId(bikeId);
    const bike = await Bike.findById(prepearedbikeId);

    const allTheReservations = bike.reservations;

    const isBookedOnThisDate = allTheReservations.reduce((acc, entity) => {
      entity.reservedDates.forEach((date) => {
        if (simpleDates.includes(date)) {
          acc = true;
        }
      });
      return acc;
    }, false);
    res.status(201).json({
      success: true,
      isBookedOnThisDate: isBookedOnThisDate,
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'Bike has not been checked for availability',
      err,
    });
  }
});

router.post('/book-bike', async (req, res) => {
  const { userId, bikeId, simpleDates } = req.body;
  try {
    const prepearedBikeId = mongoose.Types.ObjectId(bikeId);
    const prepearedUserId = mongoose.Types.ObjectId(userId);

    const bike = await Bike.findById(prepearedBikeId);
    const allTheReservations = bike.reservations;

    const existingUserIdx = bike.reservations.reduce((acc, item, idx) => {
      if (item.user?._id.toString() === userId) {
        acc = idx;
      }
      return acc;
    }, -1);

    let booking;
    if (existingUserIdx >= 0) {
      allTheReservations[existingUserIdx].reservedDates = [
        ...allTheReservations[existingUserIdx].reservedDates,
        ...simpleDates,
      ];

      booking = await Bike.findByIdAndUpdate(
        prepearedBikeId,
        {
          $set: { reservations: [...allTheReservations] },
        },
        { new: true }
      );
    } else {
      booking = await Bike.findByIdAndUpdate(
        prepearedBikeId,
        {
          $push: {
            reservations: { user: prepearedUserId, reservedDates: simpleDates },
          },
        },
        { new: true }
      );
    }

    //update user's rservation
    const user = await User.findById(prepearedUserId);
    const isBikePreviouslyBooked = user.reservedBikes.reduce((acc, bike) => {
      if (String(bike._id) === bikeId) {
        acc = true;
      }
      return acc;
    }, false);

    if (!isBikePreviouslyBooked) {
      await User.findByIdAndUpdate(
        prepearedUserId,
        {
          $push: {
            reservedBikes: prepearedBikeId,
          },
        },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      booking: booking,
      allTheReservations: allTheReservations,
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'Bike has not been booked',
      err,
    });
  }
});

router.post('/add-rating-to-bike', async (req, res) => {
  const { bikeId, rating, userId } = req.body;
  try {
    const prepearedbikeId = mongoose.Types.ObjectId(bikeId);
    const bike = await Bike.findById(prepearedbikeId);

    const usersLeftRatingCount = bike.rating.usersLeftRatingCount
      ? bike.rating.usersLeftRatingCount + 1
      : 1;

    const totalValueSumCount = bike.rating.totalValueSum
      ? +bike.rating.totalValueSum + +rating
      : +rating;

    const updatedRating = totalValueSumCount / usersLeftRatingCount;

    bike.rating.usersLeftRatingCount = usersLeftRatingCount;
    bike.rating.totalValueSum = totalValueSumCount;
    bike.rating.ratingValue = Math.round(updatedRating);

    const updatedBike = await Bike.findByIdAndUpdate(
      bike,
      {
        $set: { rating: bike.rating },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          ratedBikes: prepearedbikeId,
        },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      bikeRating: updatedBike.rating,
    });
  } catch (err) {
    console.log({ err });
    res.json({
      success: false,
      message: 'Rating was not updated for this bikeId: ' + bikeId,
      err,
    });
  }
});

module.exports = router;
