import path from 'path';
import ApiRoutes from './api/api.routes.js';
import { PORT } from './config/constants.js';
import QuestionsModel from './api/questions/questions.model.js';
import expressLayouts from 'express-ejs-layouts';
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.resolve(path.join(process.cwd(), 'src', 'public', 'views')));
app.use(express.static(path.resolve(path.join(process.cwd(), 'src', 'public', 'assets'))));
app.use(expressLayouts);

app.use('/api', ApiRoutes);

app.get('/', async (req, res, next) => {
  try {
    const questions = await QuestionsModel.fetchAllQuestions();

    const page = +req.query.page || 1;
    const pageCount = questions.length;

    return res.render('home.ejs', {
      page: page,
      pageCount: pageCount,
      questions: questions.slice(page * 1 - 1, page * 1),
    });
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => res.status(404).render('not-found.ejs')); // 404
app.use((err, req, res, next) => res.status(500).render('error.ejs')); // 500
app.listen(PORT, () => console.log(`App is running at http://localhost:${PORT}`));
