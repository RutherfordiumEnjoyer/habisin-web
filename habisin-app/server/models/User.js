const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3 },
  email:    { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Invalid email'] },
  password: { type: String, required: true, minlength: 6 },
  
  points: { type: Number, default: 0 },
  badges: [{ type: String }],

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);