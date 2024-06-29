import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const userchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
},
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true
  },
  verified: {
    type: Boolean,
    default: true
  },
  role:{
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'user']
  },
  resetToken: {
    type: String,
    required: false
  },
  otpExpires:{
    type: Date
  },
  resetTokenExpires: {
    type: String,
    required: false
  }

}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.otp;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});


const userModel = mongoose.model("User", userchema);
export default userModel;