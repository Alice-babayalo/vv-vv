import mongoose from "mongoose";


const userchema = new mongoose.Schema({
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
    default: false
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