const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const userController = require('../controllers/users');

router.get('/', userController.getUsers);

router.post(
	'/signup',
	[
		check('email')
			.trim()
			.isEmail()
			.normalizeEmail({ gmail_remove_dots: false }),
		check('password').isString().isLength({ min: 5 }),
		check('name').trim().not().isEmpty(),
	],
	userController.signup
);

router.post('/login', userController.login);

module.exports = router;
