const multer = require('multer');
const { v4: uuid } = require('uuid');
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
require('dotenv').config();

const MIME_TYPE_MAP = {
	'image/png': 'png',
	'image/jpeg': 'jpeg',
	'image/jpg': 'jpg',
	'image/gif': 'gif',
	'image/webp': 'webp',
};

const s3 = new S3Client({
	region: 'ap-southeast-1',
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY,
	},
});

const fileUpload = multer({
	limits: 5000000,
	storage: multerS3({
		s3: s3,
		acl: 'public-read-write',
		bucket: 'reactjs-placesharing',
		key: function (req, file, cb) {
			console.log(file);
			const ext = MIME_TYPE_MAP[file.mimetype];
			cb(null, 'uploads/images/' + uuid() + '.' + ext); //use Date.now() for unique file keys
		},
	}),
	fileFilter: (req, file, cb) => {
		const isValid = !!MIME_TYPE_MAP[file.mimetype];
		let error = isValid ? null : new Error('Invalid mime type');
		cb(error, isValid);
	},
});
/* const fileUpload = multer({
	limits: 5000000,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, './uploads/images');
		},
		filename: (req, file, cb) => {
			const ext = MIME_TYPE_MAP[file.mimetype];
			cb(null, uuid() + '.' + ext);
		},
	}),
	fileFilter: (req, file, cb) => {
		const isValid = !!MIME_TYPE_MAP[file.mimetype];
		let error = isValid ? null : new Error('Invalid mime type');
		cb(error, isValid);
	},
}); */

module.exports = fileUpload;
