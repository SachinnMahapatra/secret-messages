import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    uniqueLink: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
