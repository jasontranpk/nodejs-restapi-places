const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const userRoutes = require('./routes/users');
const placeRoutes = require('./routes/places');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	next();
});

app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use('/api/users', userRoutes);
app.use('/api/places', placeRoutes);

app.use((req, res, next) => {
	const error = new HttpError('Could not find this route.', 404);
	next(error);
});

app.use((error, req, res, next) => {
	if (req.file) {
		fs.unlink(req.file.path, (err) => {
			console.log(err);
		});
	}
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred' });
});

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(8000, () => {
			console.log('Server is running');
		});
	})
	.catch((err) => console.log(err));
