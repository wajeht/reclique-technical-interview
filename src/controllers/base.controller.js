const Question = require("../models/question.model.js");
const { convertPostRequestToReadableData } = require("../../util/convert-post-request-to-readable-data.js");

const getIndex = async (req, res) => {
  try {
    const questions = await Question.fetchAllQuestions();
    const page = +req.query.page || 1;
    const pageCount = questions.length;

    res.render("card.ejs", {
      page: page,
      pageCount: pageCount,
      questions: questions.slice(page * 1 - 1, page * 1),
    });
  } catch (err) {
    console.log(err);
  }
};

const postCheckAnswer = async (req, res) => {
  try {
    let { question, type } = req.query;

    // check to see if user input is empty or not
    Object.entries(req.body).forEach((input) => {
      const value = input[1];
      if (value == "") {
        throw new Error("must not be empty!");
      }
    });

    console.log(req.body);

    // convert user submitted data into our structured question json object
    const submittedAnswers = convertPostRequestToReadableData(req.body);

    console.log("submittedAnswers", submittedAnswers);

    // this code is to deal with specific key
    if (type == "cash") {
      type = 0;
    } else {
      type = 1;
    }
    question = Number.parseInt(question);

    // check answer from database
    const sameAnswer = await Question.checkAnswer(question, type, submittedAnswers);

    if (!sameAnswer) {
      throw new Error("wrong!");
    }

    // if everything worked out well, we return an ok
    res.status(200).json({ message: "ok!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getIndex,
  postCheckAnswer,
};
