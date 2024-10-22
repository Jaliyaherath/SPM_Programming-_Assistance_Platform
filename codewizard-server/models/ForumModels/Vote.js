import mongoose from "mongoose";
const { Schema } = mongoose;

const voteSchema = mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    vote: { type: Number, required: true },
  },
  { _id: false }
);
const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
