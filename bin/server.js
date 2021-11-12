require('dotenv').config();
const app = require('../src/app.js');

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
	if (err) {
		console.log('Something went wrong while starting server!');
		process.exit(1);
	}
	console.log(`Server started on http://localhost:${PORT}`);
});
