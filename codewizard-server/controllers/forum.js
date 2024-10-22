import Forum from "../models/ForumModels/Forum.js";
import ForumQuestion from "../models/ForumModels/ForumQuestion.js";
import ForumAnswer from "../models/ForumModels/ForumAnswer.js";
import { broadcastUpdate } from "../utils/websocket.js";

/**
 * @route   GET /api/forum/:labId
 * @desc    Get all questions for a lab session
 * @access  Private
 * @param   labId
 * @return  {Array} questions
 * @errors  500 { error: "Server error" }
 *          404 { error: "No forum found for this lab session" }
 *         200 { questions: [{...}, {...}, ...] }
 */
export const getForumQuestions = async (req, res) => {
  try {
    const forum = await Forum.findOne({ labSession: req.params.labId })
      .populate({
        path: "questions",
        populate: {
          path: "author",
          select: "firstName lastName",
        },
      })
      .populate({
        path: "questions",
        populate: {
          path: "answers",
          populate: {
            path: "author",
            select: "firstName lastName",
          },
        },
      });

    if (!forum) throw new Error("No forum found for this lab session");
    const customizedForum = { ...forum._doc };

    res.status(200).json(customizedForum.questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   POST /api/forum/:labId/addQuestion
 * @desc    Add a question to a lab session
 * @access  Private
 * @param   labId
 * @return  {Object} question
 * @errors  500 { error: "Server error" }
 *         404 { error: "No forum found for this lab session" }
 *        201 { question: {...} }
 */

export const addQuestion = async (req, res) => {
  try {
    const { title, description } = req.body;
    const forum = await Forum.findOne({ labSession: req.params.labId });
    if (!forum) throw new Error("No forum found for this lab session");

    const newQuestion = new ForumQuestion({
      title,
      description,
      author: req.user,
    });
    const savedQuestion = await newQuestion.save();

    await forum.addQuestion(savedQuestion);

    broadcastUpdate();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   POST /api/forum/:questionId/addAnswer
 * @desc    Add an answer to a question
 * @access  Private
 * @param   id
 * @return  {Object} answer
 * @errors  500 { error: "Server error" }
 *        404 { error: "No question found for this id" }
 */

export const addAnswer = async (req, res) => {
  try {
    const { description } = req.body;
    const newAnswer = new ForumAnswer({
      description,
      author: req.user,
    });
    const savedAnswer = await newAnswer.save();
    await ForumQuestion.findById(req.params.questionId).then((question) => {
      question.addAnswer(savedAnswer);
    });
    const populatedAnswer = await ForumAnswer.findById(
      savedAnswer._id
    ).populate({
      path: "author",
      select: "firstName lastName",
    });
    broadcastUpdate();
    res.status(201).json(populatedAnswer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   DELETE /api/forum/:questionId/deleteQuestion
 * @desc    Delete a question
 * @access  Private
 * @param   questionId
 * @return  {Object} question
 *
 */

export const deleteQuestion = async (req, res) => {
  try {
    const question = await ForumQuestion.findById(req.params.questionId);
    if (!question) throw new Error("No question found for this id");
    // authenticate user is the author of the question
    if (question.author.toString() !== req.user.toString())
      throw new Error("You are not authorized to delete this question");
    await question.deleteOne();
    // delete all answers of this question
    question.answers.forEach(async (answer) => {
      await ForumAnswer.findByIdAndDelete(answer);
    });

    broadcastUpdate();
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   DELETE /api/forum/questions/:questionId/answers/:answerId
 * @desc    Delete an answer
 * @access  Private
 * @param   answerId, questionId
 * @return  {Object} answer
 */

export const deleteAnswer = async (req, res) => {
  try {
    const answer = await ForumAnswer.findById(req.params.answerId);
    if (!answer) throw new Error("No answer found for this id");
    // authenticate user is the author of the answer
    if (answer.author.toString() !== req.user.toString())
      throw new Error("You are not authorized to delete this answer");
    await answer.deleteOne();
    // delete answer from question
    await ForumQuestion.findById(req.params.questionId).then((question) => {
      question.deleteAnswer(answer);
    });
    broadcastUpdate();
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   PUT /api/forum/questions/:questionId/updateQuestion
 * @desc    Update a question
 * @access  Private
 * @param   questionId
 * @return  {Object} question
 */

export const updateQuestion = async (req, res) => {
  try {
    const { title, description } = req.body;
    const question = await ForumQuestion.findById(req.params.questionId);
    if (!question) throw new Error("No question found for this id");
    // authenticate user is the author of the question
    if (question.author.toString() !== req.user.toString())
      throw new Error("You are not authorized to update this question");
    question.title = title;
    question.description = description;
    const savedQuestion = await question.save();
    broadcastUpdate();
    res.status(200).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   PUT /api/forum/answers/:answerId/updateAnswer
 * @desc    Update an answer
 * @access  Private
 * @param   answerId
 * @return  {Object} answer
 */

export const updateAnswer = async (req, res) => {
  try {
    const { description } = req.body;
    const answer = await ForumAnswer.findById(req.params.answerId);
    if (!answer) throw new Error("No answer found for this id");
    // authenticate user is the author of the answer
    if (answer.author.toString() !== req.user.toString())
      throw new Error("You are not authorized to update this answer");
    answer.description = description;
    await answer.save();
    const populatedAnswer = await ForumAnswer.findById(answer._id).populate({
      path: "author",
      select: "firstName lastName",
    });

    broadcastUpdate();
    res.status(200).json(populatedAnswer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------ INSTRUCTOR ONLY ------------------

/**
 * @route   PUT /api/forum/answers/:answerId/approveAnswer
 * @desc    Approve an answer
 * @access  Private
 * @param   answerId
 * @return  {Object} answer
 */

export const approveAnswer = async (req, res) => {
  try {
    const answer = await ForumAnswer.findById(req.params.answerId);
    const { markedAsSolution } = req.body;
    if (!answer) throw new Error("No answer found for this id");
    // authenticate user is the author of the answer
    if (req.role !== "instructor")
      throw new Error("You are not authorized to approve this answer");
    answer.markedAsSolution = !markedAsSolution;
    await answer.save();
    const populatedAnswer = await ForumAnswer.findById(answer._id).populate({
      path: "author",
      select: "firstName lastName",
    });

    broadcastUpdate();
    res.status(200).json(populatedAnswer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------ VOTING ------------------

/**
 * @route   PUT /api/forum/questions/:questionId/upvote
 * @desc    Upvote a question
 * @access  Private
 * @param   questionId
 * @return  {Object} question
 * @errors  500 { error: "Server error" }
 *        404 { error: "No question found for this id" }
 *       400 { error: "You cannot vote for your own question" }
 *      400 { error: "You cannot vote twice for the same question" }
 *    200 { question: {...} }
 * @notes   vote = 1
 *         vote = 0 to remove vote
 *        vote = -1
 */

export const upvoteQuestion = async (req, res) => {
  try {
    const question = await ForumQuestion.findById(req.params.questionId);
    await question.vote(req.user, 1);
    broadcastUpdate();
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   PUT /api/forum/questions/:questionId/downvote
 * @desc    Downvote a question
 * @access  Private
 * @param   questionId
 * @return  {Object} question
 */

export const downvoteQuestion = async (req, res) => {
  try {
    const question = await ForumQuestion.findById(req.params.questionId);
    await question.vote(req.user, -1);
    broadcastUpdate();
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   PUT /api/forum/questions/:questionId/unvote
 * @desc    Unvote a question
 * @access  Private
 * @param   questionId
 * @return  {Object} question
 */

export const unvoteQuestion = async (req, res) => {
  try {
    const question = await ForumQuestion.findById(req.params.questionId);
    await question.vote(req.user, 0);
    broadcastUpdate();
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   PUT /api/forum/answers/:answerId/upvote
 * @desc    Upvote an answer
 * @access  Private
 * @param   answerId
 * @return  {Object} answer
 */

export const upvoteAnswer = async (req, res) => {
  try {
    const answer = await ForumAnswer.findById(req.params.answerId);
    await answer.vote(req.user, 1);
    broadcastUpdate();
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   PUT /api/forum/answers/:answerId/downvote
 * @desc    Downvote an answer
 * @access  Private
 * @param   answerId
 * @return  {Object} answer
 * @errors  500 { error: "Server error" }
 */

export const downvoteAnswer = async (req, res) => {
  try {
    const answer = await ForumAnswer.findById(req.params.answerId);
    await answer.vote(req.user, -1);
    broadcastUpdate();
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @route   PUT /api/forum/answers/:answerId/unvote
 * @desc    Unvote an answer
 * @access  Private
 * @param   answerId
 * @return  {Object} answer
 * @errors  500 { error: "Server error" }
 */

export const unvoteAnswer = async (req, res) => {
  try {
    const answer = await ForumAnswer.findById(req.params.answerId);
    await answer.vote(req.user, 0);
    broadcastUpdate();
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------ VIEWS ------------------

/**
 * @route   PUT /api/forum/questions/:questionId/add-view
 * @desc    View a question
 * @access  Private
 * @param   questionId
 * @return  {Object} question
 */

export const addView = async (req, res) => {
  try {
    const question = await ForumQuestion.findById(req.params.questionId);
    await question.addViews(req.user);
    broadcastUpdate();
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
