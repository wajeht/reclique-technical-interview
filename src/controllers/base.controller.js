const Question = require("../models/question.model.js");
const {
  convertPostRequestToReadableData,
} = require("../../util/convert-post-request-to-readable-data.js");

const getIndex = async (req, res) => {
  try {
    const questions = await Question.fetchAllQuestions();
    const page = +req.query.page || 1;
    const pageCount = questions.length;

    res.render("card.ejs", {
      error: "",
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
    const data = convertPostRequestToReadableData(req.body);

    console.log({ question, type });

    const getType = type;

    if (type == "cash") {
      type = 0;
    } else {
      type = 1;
    }

    question = Number.parseInt(question);

    const sameAnswer = await Question.checkAnswer(question, type, data);

    if (!sameAnswer) {
      res.status(204).json({ message: "not found!" });
      return;
    }

    res.status(200).json({ message: "ok" });
  } catch (err) {
    console.table(err);
  }
};

module.exports = {
  getIndex,
  postCheckAnswer,
};
