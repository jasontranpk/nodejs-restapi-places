const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users');
const placeRoutes = require('./routes/places');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/places', placeRoutes);

app.use((req, res, next) => {
	const error = new HttpError('Could not find this route.', 404);
	next(error);
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred' });
});

app.listen(8000, () => {
	console.log('Server is running');
});
