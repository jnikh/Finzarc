const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_EXPIRES_IN , JWT_SECRET} = require('../config/env')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        trim:true,
        
    },
    password:{
        type: String,
        required: true,
        minlength:6
    }
}, 
{
    timestamps:true
})

userSchema.pre('save' , async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bycrypt.hash(this.password ,12);
    next();
})

userSchema.methods.generateAuthToken = function() {
    return jwt.sign(
      { userId: this._id }, // Payload
      JWT_SECRET,          // Secret key
      { expiresIn: JWT_EXPIRES_IN } // Options
    );
  };

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Invalid credentials');
    }
  
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
  
    return user;
  };

  const User = mongoose.model('User', userSchema);

  module.exports = User;