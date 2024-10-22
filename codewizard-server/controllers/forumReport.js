import Forum from "../models/ForumModels/Forum.js";
import LabSession from "../models/LabSession.js";

export const getForumReport = async (req, res) => {
  try {
    const lab = await LabSession.findById(req.params.labId).select("-password");
    const forum = await Forum.findOne({ labSession: req.params.labId })
      .populate({
        path: "questions",
        populate: {
          path: "answers",
          populate: {
            path: "author",
            select: "firstName lastName",
          },
        },
      })
      .populate({
        path: "questions",
        populate: {
          path: "author",
          select: "firstName lastName userRegNo role",
        },
      })
      .populate({
        path: "questions",
        populate: {
          path: "views",
          select: "firstName lastName",
        },
      })
      .populate({
        path: "questions",
        populate: {
          path: "votes.user",
          select: "firstName lastName",
        },
      })
      .populate({
        path: "questions",
        populate: {
          path: "answers",
          populate: {
            path: "votes.user",
            select: "firstName lastName",
          },
        },
      });

    if (!forum) return res.status(404).json({ message: "Forum not found" });
    if (forum.questions.length < 1)
      return res.json({ error_message: "Questions not found" });

    const report = {
      labData: lab,
      totalNumberOfQuestions: forum.questions.length,
      totalNumberOfAnswers: forum.questions.reduce(
        (acc, question) => acc + question.answers.length,
        0
      ),
      percentageOfQuestionsAnswered: calculateThePercentageOfQuestionsAnswered(
        forum.questions
      ),

      mostViewQuestions: [],
      mostAnsweredQuestions: [],
      mostUpVotedQuestions: [],
      mostDownVotedQuestions: [],
      leaderboard: [],
    };
    // get array of {questionId, question , views , author firstName LastName }[]
    report.mostViewQuestions = forum.questions
      .map((question) => {
        return {
          questionId: question._id,
          question: question.title,
          views: question.views.length,
          author: question.author.firstName + " " + question.author.lastName,
        };
      })
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    // get array of {questionId, question , answers , author firstName LastName }[]
    report.mostAnsweredQuestions = forum.questions
      .map((question) => {
        return {
          questionId: question._id,
          question: question.title,
          answers: question.answers.length,
          author: question.author.firstName + " " + question.author.lastName,
        };
      })
      .sort((a, b) => b.answers - a.answers)
      .slice(0, 5);

    // get array of {questionId, question , score , author firstName LastName }[]
    report.mostUpVotedQuestions = forum.questions
      .map((question) => {
        return {
          questionId: question._id,
          question: question.title,
          score: question.score,
          author: question.author.firstName + " " + question.author.lastName,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // get array of {questionId, question , score , author firstName LastName }[]
    report.mostDownVotedQuestions = forum.questions
      .map((question) => {
        return {
          questionId: question._id,
          question: question.title,
          score: question.score,
          author: question.author.firstName + " " + question.author.lastName,
        };
      })
      .sort((a, b) => a.score - b.score)
      .slice(0, 5);

    report.leaderboard = calculateLeaderboard(forum);
    res.status(200).json(report);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

function calculateThePercentageOfQuestionsAnswered(questions) {
  const answeredQuestions = questions.filter((question) => {
    return question.answers.length > 0;
  });
  return ((answeredQuestions.length / questions.length) * 100).toFixed(2);
}

//TODO: rewrite this function
function calculateLeaderboard(data) {
  const userScores = {};

  // Iterate through the questions and answers to calculate user scores
  data.questions.forEach((question) => {
    const authorId = question.author._id;
    const questionScore = 2; // 2 points for asking a question

    if (!userScores[authorId]) {
      userScores[authorId] = {
        studentId: question.author.userRegNo,
        name: question.author.firstName + " " + question.author.lastName,
        role: question.author.role,
        score: 0,
        questions: 0,
        answers: 0,
        votesGiven: 0,
        upvotesReceived: 0,
        views: 0,
        solutions: 0,
      };
    }

    userScores[authorId].questions += 1;
    userScores[authorId].score += questionScore;

    question.answers.forEach((answer) => {
      const answerScore = 4; // 4 points for answering a question
      userScores[authorId].answers += 1;
      userScores[authorId].score += answerScore;

      answer.votes.forEach(() => {
        const voteScore = 1; // 1 point for giving a vote
        userScores[authorId].votesGiven += 1;
        userScores[authorId].score += voteScore;
      });

      if (answer.markedAsSolution) {
        const solutionScore = 7; // 10 points for having an answer marked as a solution
        userScores[authorId].solutions += 1;
        userScores[authorId].score += solutionScore;
      }

      userScores[authorId].upvotesReceived += answer.score; // 4 points for each upvote received
    });

    userScores[authorId].views += question.views.length; // 1 point for each view
  });

  // Convert the userScores object to an array for sorting
  // Sort the leaderboard based on the user's total score
  const leaderboard = Object.values(userScores).sort(
    (a, b) => b.score - a.score
  );

  // Sort the leaderboard based on the user's total score

  //filter out the instructors
  return leaderboard.filter((user) => user.role !== "instructor");
}
