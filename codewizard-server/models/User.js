import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userRegNo: {
      type: String,
      required: true,
      max: 10,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      max: 20,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "student", "instructor"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
