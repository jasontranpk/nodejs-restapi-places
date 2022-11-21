const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');

const placeController = require('../controllers/places');
const checkAuth = require('../middleware/check-auth');

router.get('/user/:uid', placeController.getPlacesByUserId);

router.get('/:pid', placeController.getPlaceById);

router.use(checkAuth);

router.delete('/:pid', placeController.deletePlace);

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
	fileUpload.single('image'),
	(req, res, next) => {
		console.log(req.file);
		next();
	},
	[
		check('title').trim().not().isEmpty(),
		check('description').trim().isLength({ min: 5 }),
		check('address').trim().not().isEmpty(),
	],
	placeController.createPlace
);

module.exports = router;
