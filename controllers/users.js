const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

exports.getUsers = async (req, res, next) => {
	let users;
	try {
		users = await User.find({}, '-password');
	} catch (err) {
		const error = new HttpError(
			'Something wrong, Fetching users failed',
			500
		);
		return next(err);
	}
	res.status(200).json({
		users: users.map((u) => u.toObject({ getters: true })),
	});
};

exports.signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		throw new HttpError('Please enter valid input data', 422);
	}
	const { name, password, email } = req.body;
	let hasUser;
	try {
		hasUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, Could not sign up',
			500
		);
		return next(error);
	}
	if (hasUser) {
		const error = new HttpError('Email is already registered', 422);
		return next(error);
	}
	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
		const error = new HttpError('Could not encode password', 500);
		return next(error);
	}
	const user = new User({
		name,
		password: hashedPassword,
		email,
		image: req.file.path,
		places: [],
	});
	let token;
	try {
		await user.save();
		token = jwt.sign(
			{ id: user._id, name: user.name },
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: '1h',
			}
		);
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, Could not sign up',
			500
		);
		return next(error);
	}
	res.status(201).json({ userId: user.id, email: user.email, token: token });
};

exports.login = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		throw new HttpError('Please enter valid input data', 422);
	}
	const { email, password } = req.body;
	let user, isValidPassword;
	try {
		user = await User.findOne({ email: email });
		isValidPassword = await bcrypt.compare(password, user.password);
	} catch (err) {
		const error = new HttpError('Wrong email or password', 500);
		return next(error);
	}
	if (!user || !isValidPassword) {
		const error = new HttpError('Could not identify user', 403);
		return next(error);
	}
	let token;
	try {
		token = jwt.sign(
			{ id: user._id, name: user.name },
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: '1h',
			}
		);
	} catch (err) {
		console.log(err);
		const error = new HttpError(
			'Something wrong, could not log you in',
			500
		);
		return next(err);
	}
	res.status(200).json({
		message: 'logged in',
		userId: user.id,
		email: email,
		token: token,
	});
};
