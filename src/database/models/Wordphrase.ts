import mongoose from "mongoose";

const wordphraseSchema = new mongoose.Schema({
  text: {
    type: String
  },
  translation: {
    type: String
  },
  type: {
    type: String
  },
  videoId: {
    type: mongoose.Types.ObjectId
  }
});

export default mongoose.model("wordphrases", wordphraseSchema);
