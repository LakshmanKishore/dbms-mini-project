const Directed = require("../models/directed.model.js")

exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}
	// Create a Directed
	const directed = new Directed({
		dir_id: req.body.dir_id,
		mov_id: req.body.mov_id,
	});

	// Save Directed in the database
	Directed.create(directed, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Directed.',
			});
		else res.send(data);
	});
};