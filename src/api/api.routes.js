import express from 'express';
const api = express.Router();

import QuestionsRoutes from './questions/questions.routes.js';

api.use('/questions', QuestionsRoutes);

export default api;
