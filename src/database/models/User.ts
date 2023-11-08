import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  password: {
    type: String,
  },
  login: {
    type: String,
    maxLength: 10,
  }
});

export default mongoose.model("User", userSchema);
