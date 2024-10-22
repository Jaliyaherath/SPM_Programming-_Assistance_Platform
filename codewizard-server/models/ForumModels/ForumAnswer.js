import mongoose from "mongoose";
const { Schema } = mongoose;
import Vote from "./Vote.js";

const ForumAnswerSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      max: 1000,
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    markedAsSolution: {
      type: Boolean,
      default: false,
    },
    score: { type: Number, default: 0 },
    votes: [Vote.schema],
  },
  { timestamps: true, collection: "forumAnswer" }
);

ForumAnswerSchema.methods.vote = function (user, vote) {
  const existingVote = this.votes.find((v) => v.user._id.equals(user));

  if (existingVote) {
    // reset score
    this.score -= existingVote.vote;
    if (vote == 0) {
      // remove vote
      this.votes.pull(existingVote);
    } else {
      //change vote
      this.score += vote;
      existingVote.vote = vote;
    }
  } else if (vote !== 0) {
    // new vote
    this.score += vote;
    this.votes.push({ user, vote });
  }

  return this.save();
};

ForumAnswerSchema.post("save", function (doc, next) {
  doc.populate("author", "firstName lastName").then(() => {
    next();
  });
});

const ForumAnswer = mongoose.model("ForumAnswer", ForumAnswerSchema);

export default ForumAnswer;
