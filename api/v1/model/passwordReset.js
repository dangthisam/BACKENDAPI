// models/PasswordReset.js
const mongoose = require('mongoose');
const PasswordResetSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, expires:180 },
},{
    timestamps: true
});
module.exports = mongoose.model('PasswordReset', PasswordResetSchema);
