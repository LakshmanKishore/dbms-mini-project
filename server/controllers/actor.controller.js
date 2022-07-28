const Actor = require("../models/actor.model.js")

exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}
	// Create a Actor
	const actor = new Actor({
		act_id: req.body.act_id,
		act_name: req.body.act_name,
		act_age: req.body.act_age,
		act_gender: req.body.act_gender,
	});

	// Save Actor in the database
	Actor.create(actor, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Actor.',
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
	// Create an Actor;
	const actor = new Actor({
		act_id: req.body.act_id,
		act_name: req.body.act_name,
		act_age: req.body.act_age,
		act_gender: req.body.act_gender,
	});console.log(actor);

	// Save Actor in the database
	Actor.update(actor, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while updating the Actor.',
			});
		else res.send(data);
	});
};

exports.delete = (req,res) => {
	Actor.delete(req.params.act_id, (err, data) => {
		if(err)
			res.send(500).send({
				message: err.message || "Some error occured",
			})
		else res.send(data);
	})
}


exports.getAllActors = (req, res) => {
	Actor.getAllActors((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred',
			});
		else res.send(data);
	});
};