
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const API = process.env.API;

class Question {
	static async fetchAllQuestions() {
		try {
			const res = await fetch(API);

			if (!res.ok) {
				throw new Error('Some thing went wrong while pulling data from database');
			}

			const data = await res.json();

			return data;
		} catch (err) {
			console.log(err);
		}
}

	/**
	 *
	 * @param {Number} questionId
	 * @param {Number} answerType
	 * @param {Object} entryObject
	 * @returns
	 */
	static checkAnswer = (questionId, answerType, entryObject)=> {
		return null
	}
}

module.exports = Question;
