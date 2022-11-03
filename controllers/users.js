const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

const DUMMY_USERS = [
	{
		id: 'u1',
		name: 'Jason',
		email: 'jason@gmail.com',
		password: '123',
	},
];

exports.getUsers = (req, res, next) => {
	res.json({ users: DUMMY_USERS });
};

exports.signup = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		throw new HttpError('Please enter valid input data', 422);
	}
	const { name, password, email } = req.body;

	const hasUser = DUMMY_USERS.find((user) => user.email === email);

	if (hasUser) {
		const error = new HttpError('Email is already registered', 422);
		return next(error);
	}
	const user = {
		id: uuid(),
		name,
		password,
		email,
	};
	DUMMY_USERS.push(user);
	res.status(201).json({ user: user });
};

exports.login = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		throw new HttpError('Please enter valid input data', 422);
	}
	const { email, password } = req.body;
	const user = DUMMY_USERS.find((u) => u.email === email);
	if (!user || user.password !== password) {
		const error = new HttpError('Could not identify user', 401);
		return next(error);
	}
	res.json({ message: 'logged in' });
};
