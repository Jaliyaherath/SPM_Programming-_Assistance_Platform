import mongoose from "mongoose";
const { Schema } = mongoose;
const ForumSchema = mongoose.Schema(
  {
    labSession: { type: Schema.Types.ObjectId, ref: "LabSession" },
    questions: [{ type: Schema.Types.ObjectId, ref: "ForumQuestion" }],
  },
  { timestamps: true, collection: "forum" }
);

ForumSchema.methods.addQuestion = function (question) {
  this.questions.push(question);
  this.save();
};
ForumSchema.populate;

const Forum = mongoose.model("Forum", ForumSchema);

export default Forum;
