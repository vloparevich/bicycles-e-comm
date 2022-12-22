const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [false, 'Password is required'],
  },
  fullName: {
    type: String,
    required: false,
    lowercase: false,
    trim: true,
  },
  isManager: {
    type: Boolean,
  },
  reservedBikes: [
    { type: Schema.Types.ObjectId, ref: 'Bike', autopopulate: true },
  ],
  ratedBikes: [
    { type: Schema.Types.ObjectId, ref: 'Bike', autopopulate: true },
  ],
});
userSchema.plugin(require('mongoose-autopopulate'));
const User = model('User', userSchema);
module.exports = User;
