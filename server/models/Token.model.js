const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  tokenId: {
    type: String,
    required: true,
  },
});

const Token = model('Token', tokenSchema);
module.exports = Token;
