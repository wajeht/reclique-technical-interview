import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import ApiRoutes from './api/api.routes.js';
import { PORT } from './config/constants.js';
import rateLimiter from './config/rateLimiter.js';
import QuestionsModel from './api/questions/questions.model.js';
import expressLayouts from 'express-ejs-layouts';
import express from 'express';

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet({ contentSecurityPolicy: false })); // prettier-ignore
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.resolve(path.join(process.cwd(), 'src', 'public', 'views')));
app.use(express.static(path.resolve(path.join(process.cwd(), 'src', 'public', 'assets'))));
app.use(expressLayouts);
app.use(rateLimiter);

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
