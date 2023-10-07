import app from './app.js';
import { PORT } from './config/constants.js';

app.listen(PORT, () => console.log(`App is running at http://localhost:${PORT}`));
