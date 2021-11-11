const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const API = 'https://reclique.github.io/web-dev-testing/1_accounting_game/questions.json';

class Question {
	static async fetchAllQuestions() {
		try {
			const res = await fetch(API);
			const data = await res.json();

			if (!res.ok) {
				throw new Error(
					'Some thing went wrong while pulling data from database',
				);
			}

			return data;
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = Question;
