const Review = require("../models/review.model.js")

exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}
	// Create a Review
	const review = new Review({
		mov_id: req.body.mov_id,
		stars: req.body.stars,
		comment: req.body.comment,
	});

	// Save Review in the database
	Review.create(review, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Review.',
			});
		else res.send(data);
	});
};

exports.update = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}
	// Update a Review
	const review = new Review({
		mov_id: req.body.mov_id,
		stars: req.body.stars,
		comment: req.body.comment,
	});

	// Update Review in the database
	Review.update(review, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Review.',
			});
		else res.send(data);
	});
};

exports.getAllReviews = (req, res) => {
	Review.getAllReviews((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred',
			});
		else res.send(data);
	});
};

exports.delete = (req, res) => {
	Review.delete(req.params.mov_id,(err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred',
			});
		else res.send(data);
	});
};