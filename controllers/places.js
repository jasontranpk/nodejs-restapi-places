const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');

exports.getPlaceById = async (req, res, next) => {
	const placeId = req.params.pid;
	let place;
	try {
		place = await Place.findById({ _id: placeId });
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, Could not find a place',
			500
		);
		return next(error);
	}
	if (!place) {
		const error = new HttpError(
			'Could not find a place for the provided id',
			500
		);
		return next(error);
	}
	res.json({ place: place.toObject({ getters: true }) });
};

exports.getPlacesByUserId = async (req, res, next) => {
	const userId = req.params.uid;
	let places;
	try {
		places = await Place.find({ creator: userId });
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, Could not find a place',
			500
		);
		return next(error);
	}
	if (!places || places.length === 0) {
		const error = new HttpError(
			'Could not find a places for the  provided user id',
			404
		);
		return next(error);
	}
	res.json({
		places: places.map((place) => place.toObject({ getters: true })),
	});
};

exports.createPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return next(
			new HttpError('Invalid inputs passed, please check your data', 422)
		);
	}
	const { title, description, address, creator } = req.body;
	let createdPlace;
	try {
		const coordinates = await getCoordsForAddress(address);
		createdPlace = new Place({
			title,
			description,
			location: coordinates,
			address,
			creator,
			image: 'http://placeimg.com/640/480/city',
		});

		const user = await User.findById(creator);

		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdPlace.save({ session: sess });
		user.places.push(createdPlace);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError('Creating place failed, please try again');
		return next(err);
	}
	res.status(201).json({ place: createdPlace });
};

exports.editPlace = async (req, res, next) => {
	const { title, description, address, creator } = req.body;
	const placeId = req.params.pid;
	let place;
	try {
		place = await Place.findById(placeId);

		if (!place) {
			const error = new HttpError(
				'Could not find a place for the provided id',
				404
			);
			return next(error);
		}
		let coordinates;
		coordinates = await getCoordsForAddress(address);

		place.title = title;
		place.description = description;
		place.address = address;
		place.location = coordinates;
		place.creator = creator;

		await place.save();
	} catch (err) {
		const error = new HttpError('Updating place failed, please try again');
		return next(error);
	}

	res.status(200).json({ place: place.toObject({ getters: true }) });
};

exports.deletePlace = async (req, res, next) => {
	const placeId = req.params.pid;
	let place;
	try {
		place = await Place.findById(placeId).populate('creator');
		if (!place) {
			const error = new HttpError(
				'Could not find a place for the provided id',
				404
			);
			return next(error);
		}
		const sess = await mongoose.startSession();
		sess.startTransaction();
		place.creator.places.pull(place);
		await place.creator.save();
		await place.remove({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		console.log(err);
		const error = new HttpError('Could not delete place');
		return next(error);
	}

	res.status(200).json({ message: 'Deleted Place' });
};
