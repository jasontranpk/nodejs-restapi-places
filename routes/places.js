const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const placeController = require('../controllers/places');

router.get('/user/:uid', placeController.getPlacesByUserId);

router.delete('/:pid', placeController.deletePlace);

router.get('/:pid', placeController.getPlaceById);

router.patch(
	'/:pid',
	[
		check('title').trim().not().isEmpty(),
		check('description').trim().isLength({ min: 5 }),
		check('address').trim().not().isEmpty(),
	],
	placeController.editPlace
);

router.post(
	'/',
	[
		check('title').trim().not().isEmpty(),
		check('description').trim().isLength({ min: 5 }),
		check('address').trim().not().isEmpty(),
	],
	placeController.createPlace
);

module.exports = router;
