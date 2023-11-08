import mongoose from "mongoose";

const coupleSchema = new mongoose.Schema({
  level: {
    type: Number,
    default: 1,
  },
  wordphrase: {
    type: String,
  },
  translation: {
    type: String,
  },
  date: {
    type: Date,
  }


});

export default mongoose.model("Couple", coupleSchema);
