const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const DUMMY_PLACES = [
	{
		id: 'p1',
		title: 'Empire State Building',
		description:
			'Architecto maxime recusandae rerum excepturi sed saepe. Minus aut quaerat. Non animi consequatur eos excepturi sit blanditiis. Ut aut ipsa aut consequatur rem repellendus quasi. Nihil ea illo labore vitae consequuntur.',
		location: {
			lat: 67.5675,
			lng: -95.7065,
		},
		address: '20 W 34th St., New York, NY 10001, USA',
		creator: 'u1',
	},
];

exports.getPlaceById = (req, res, next) => {
	const placeId = req.params.pid;
	const place = DUMMY_PLACES.find((place) => place.id === placeId);
	if (!place) {
		const error = new HttpError(
			'Could not find a place for the provided ip',
			404
		);
		return next(error);
	}
	res.json({ message: 'Place route work!', place });
};

exports.getPlacesByUserId = (req, res, next) => {
	const userId = req.params.uid;
	const places = DUMMY_PLACES.filter((place) => place.creator === userId);
	if (!places || places.length === 0) {
		const error = new HttpError(
			'Could not find a places for the  provided user ip',
			404
		);
		return next(error);
	}
	res.json({ places });
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
	let coordinates;

	try {
		coordinates = await getCoordsForAddress(address);
	} catch (error) {
		return next(error);
	}
	console.log(coordinates);
	const createdPlace = {
		id: uuid(),
		title,
		description,
		location: coordinates,
		address,
		creator,
	};
	DUMMY_PLACES.push(createdPlace);
	res.status(200).json({ place: createdPlace });
};

exports.editPlace = (req, res, next) => {
	const { title, description, coordinates, address, creator } = req.body;
	const placeId = req.params.pid;
	const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
	const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
	updatedPlace.title = title;
	updatedPlace.description = description;
	updatedPlace.address = address;
	updatedPlace.location = coordinates;
	if (!updatedPlace) {
		const error = new HttpError('Could not find the place', 404);
		return next(error);
	}
	DUMMY_PLACES[placeIndex] = updatedPlace;
	res.status(200).json({ place: updatedPlace });
};

exports.deletePlace = (req, res, next) => {
	const placeId = req.params.pid;
	if (DUMMY_PLACES.find((p) => p.id === placeId)) {
		throw new HttpError('Could not find place for that Id', 404);
	}
	const updatedPlaces = DUMMY_PLACES.filter((p) => p.id !== placeId);
	res.status(200).json({ message: 'Deleted Place' });
};
