import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

const userCheckSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  }
});

module.exports = mongoose.model('UserCheck', userCheckSchema);
