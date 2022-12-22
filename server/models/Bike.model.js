const { Schema, model } = require('mongoose');

const bikeSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  model: { type: String, required: true },
  color: { type: String, required: true },
  location: { type: String, required: true },
  rating: {
    usersLeftRatingCount: { type: Number },
    totalValueSum: { type: Number },
    ratingValue: { type: Number },
    required: false,
  },
  pic: { type: String, required: true },
  reservations: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User', autopopulate: true },
      reservedDates: [{ type: String }],
    },
  ],
});

bikeSchema.plugin(require('mongoose-autopopulate'));
const Bike = model('Bike', bikeSchema);

module.exports = Bike;
