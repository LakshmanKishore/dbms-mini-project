const Director = require("../models/director.model.js");

exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}
	// Create a Director
	const director = new Director({
		dir_id: req.body.dir_id,
		dir_name: req.body.dir_name,
		dir_age: req.body.dir_age,
		dir_gender: req.body.dir_gender,
	});

	// Save Director in the database
	Director.create(director, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Director.',
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
	// Create a Director
	const director = new Director({
		dir_id: req.body.dir_id,
		dir_name: req.body.dir_name,
		dir_age: req.body.dir_age,
		dir_gender: req.body.dir_gender,
	});console.log(director);

	// Save Director in the database
	Director.update(director, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while updateateateating the Director.',
			});
		else res.send(data);
	});
};

exports.delete = (req,res) => {
	Director.delete(req.params.dir_id, (err, data) => {
		if(err)
			res.send(500).send({
				message: err.message || "Some error occured",
			})
		else res.send(data);
	})
}

exports.getAllDirectors = (req, res) => {
	Director.getAllDirectors((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred',
			});
		else res.send(data);
	});
};