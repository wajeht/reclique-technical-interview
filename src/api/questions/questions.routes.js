import { postCheckAnswer, getQuestions } from './questions.controller.js';

import express from 'express';
const questions = express.Router();

questions.get('/', getQuestions);
questions.post('/', postCheckAnswer);

export default questions;
