const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

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
		hashedPassword = await bcrypt.hash(password, 8);
	} catch (err) {
		const error = new HttpError('Could not encode password', 500);
		return next(error);
	}
	const user = new User({
		name,
		password: hashedPassword,
		email,
		image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1164.jpg',
	});

	try {
		await user.save();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, Could not sign up',
			500
		);
		return next(err);
	}
	res.status(201).json({ user: user.toObject({ getters: true }) });
};

exports.login = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		throw new HttpError('Please enter valid input data', 422);
	}
	const { email, password } = req.body;
	let user, isEqual;
	try {
		user = await User.findOne({ email: email });
		isEqual = await bcrypt.compare(password, user.password);
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, Signing in failed',
			500
		);
		return next(error);
	}
	if (!user || !isEqual) {
		const error = new HttpError('Could not identify user', 401);
		return next(error);
	}
	res.json({ message: 'logged in' });
};
