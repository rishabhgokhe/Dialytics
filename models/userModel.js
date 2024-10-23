import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmail,
  },
  password: {
    type: String,
    required: true,
    minLength: [10, "Password must be atleast 10 Characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  loginAt: { type: Date },
  logoutAt: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
