import fs from 'fs/promises';
import path from 'path';

import { DATABASE_URL } from '../../config/constants.js';
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/**
 * Fetch list of questions from database/api
 * @returns {Array} list of question
 */
export default class Questions {
  static async fetchAllQuestions() {
    try {
      const res = await fetch(DATABASE_URL);

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
        questions[questionId - 1]['correct_answers'][answerType].entries;

      console.log('entriesFromQuestionBank', entriesFromQuestionBank);

      return JSON.stringify(entries) === JSON.stringify(entriesFromQuestionBank);
    } catch (err) {
      console.log(err);
    }
  };
}
