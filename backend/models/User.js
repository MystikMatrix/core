const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema with required fields and unique constraints (Can adapt as we decide on the DB ERD)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Pre-save middleware to hash password before saving to the database
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) return next();
  
    // Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
  
    // Proceed with saving the document
    next();
  });

module.exports = mongoose.model('User', userSchema);
