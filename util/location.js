require('dotenv').config();

const axios = require('axios');
const { __esModule } = require('uuid');
const HttpError = require('../models/http-error');

async function getCoordsForAddress(address) {
	// return { lat: 82.563, lng: -106.8365 };
	const response = await axios.get(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
			address
		)}&key=${process.env.GG_API_KEYS}`
	);
	/* 	console.log(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
			address
		)}&key=${process.env.GG_API_KEYS}`
	); */
	const data = response.data;
	if (!data || data.status === 'ZERO_RESULTS') {
		const error = new HttpError(
			'Could not find location for the specified address',
			422
		);
		throw error;
	}
	const coordinates = data.results[0].geometry.location;

	return coordinates;
}

module.exports = getCoordsForAddress;
