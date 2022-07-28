const Casted = require("../models/casted.model.js")

exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}
	// Create Casted
	const casted = new Casted({
		act_id: req.body.act_id,
		mov_id: req.body.mov_id,
		role: req.body.role,
	});

	// Save Casted in the database
	Casted.create(casted, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Casted.',
			});
		else res.send(data);
	});
};