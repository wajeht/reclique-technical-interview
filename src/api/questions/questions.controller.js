import path from 'path';
import fs from 'fs/promises';

import QuestionsModel from './questions.model.js';
import { convertPostRequestToReadableData } from '../../utils/helpers.js';

export async function getQuestions(req, res) {
  try {
    const { long } = req.query;

    const longQuestionsJson = await fs.readFile(path.resolve(path.join(process.cwd(), '.reclique', 'questions_long.json')), 'utf-8'); // prettier-ignore
    const shortQuestionsJson = await fs.readFile(path.resolve(path.join(process.cwd(), '.reclique', 'questions.json')), 'utf-8'); // prettier-ignore

    if (long != undefined && long === 'true') {
      return res.status(200).json(JSON.parse(longQuestionsJson));
    }

    return res.status(200).json(JSON.parse(shortQuestionsJson));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function postCheckAnswer(req, res) {
  try {
    let { question, type } = req.query;
    const questions = await QuestionsModel.fetchAllQuestions();

    console.log({ question, length: questions.length });

    // check to see if user input is empty or not
    Object.entries(req.body).forEach((input) => {
      const value = input[1];
      if (value == '') {
        throw new Error('All input fields must not be empty!');
      }
    });

    // convert user submitted data into our structured question json object
    const submittedAnswers = convertPostRequestToReadableData(req.body);

    console.log('submittedAnswers', submittedAnswers);

    // this code is to deal with specific key
    if (type == 'cash') {
      type = 0;
    } else {
      type = 1;
    }
    question = Number.parseInt(question);

    // check answer from database
    const sameAnswer = await QuestionsModel.checkAnswer(question, type, submittedAnswers);

    if (!sameAnswer) {
      throw new Error('Wrong answer, please try again!');
    }

    // if everything worked out well, we return an ok
    res.status(200).json({
      message:
        question === questions.length
          ? "Answer correct, you're done!"
          : 'Answer correct, click next!',
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
