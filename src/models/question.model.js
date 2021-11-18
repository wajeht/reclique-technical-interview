require("dotenv").config();
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const DATABASE = process.env.DATABASE;

/**
 * Fetch list of questions from database/api
 * @returns {Array} list of question
 */
class Question {
  static async fetchAllQuestions() {
    try {
      const res = await fetch(DATABASE);

      if (!res.ok) {
        throw new Error(
          "Some thing went wrong while pulling data from database"
        );
      }

      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * This function will check for user input and answer from database
   * @param {Number} questionId
   * @param {Number} answerType
   * @param {Array} entries
   * @returns {Boolean} true or false depending on whether user input vs question bank are same
   */
  static checkAnswer = async (questionId, answerType, entries) => {
    try {
      const questions = await this.fetchAllQuestions();
      const entriesFromQuestionBank =
        questions[questionId - 1]["correct_answers"][answerType].entries;

      console.log("entriesFromQuestionBank", entriesFromQuestionBank);

      return (
        JSON.stringify(entries) === JSON.stringify(entriesFromQuestionBank)
      );
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = Question;
