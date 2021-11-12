const Question = require('../models/question.model.js');

const getIndex = async (req, res, next) => {
	try {
		const questions = await Question.fetchAllQuestions();
		const page = +req.query.page || 1;
		const pageCount = questions.length;

		res.render('card.ejs', {
			page: page,
			pageCount: pageCount,
			questions: questions.slice(page * 1 - 1, page * 1),
		});
	} catch (err) {
		console.log(err);
	}
};

const postCheckAnswer = async (req, res, next) => {
	const data = { ...req.body };

	console.log(data);
};

module.exports = {
	getIndex,
	postCheckAnswer,
};
