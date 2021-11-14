const Question = require("../models/question.model.js");
const { convertPostRequestToReadableData } = require('../../lib/convert-post-request-to-readable-data.js')

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
  const data = convertPostRequestToReadableData(req);

};

module.exports = {
  getIndex,
  postCheckAnswer,
};
