import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

const userCheckSchema = new Schema({
  username: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('UserCheck', userCheckSchema);
