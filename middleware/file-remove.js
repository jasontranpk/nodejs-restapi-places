const aws = require('aws-sdk');
require('dotenv').config();

const s3 = new aws.S3({
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
	Bucket: process.env.BUCKET,
});

const fileRemove = (key) => {
	s3.deleteObject({ Bucket: process.env.BUCKET, Key: key }, (err, data) => {
		console.error(err);
	});
};

module.exports = fileRemove;
