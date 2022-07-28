const Song = require("../models/song.model.js");

exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}
	// Create a Song
	const song = new Song({
		song_id: req.body.song_id,
		song_name: req.body.song_name,
		singer: req.body.singer,
		mov_id: req.body.mov_id,
	});

	// Save Song in the database
	Song.create(song, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Song.',
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
	// Update a Song
	const song = new Song({
		song_id: req.body.song_id,
		song_name: req.body.song_name,
		singer: req.body.singer,
		mov_id: req.body.mov_id,
	});

	// Update Song in the database
	Song.update(song, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Song.',
			});
		else res.send(data);
	});
};

exports.getAllSongs = (req, res) => {
	Song.getAllSongs((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred',
			});
		else res.send(data);
	});
};

exports.delete = (req,res) => {
	Song.delete(req.params.song_id, (err, data) => {
		if(err)
			res.send(500).send({
				message: err.message || "Some error occured",
			})
		else res.send(data);
	})
}