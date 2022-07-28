const Movie = require('../models/movie.model.js');

exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
	}
	// Create a Movie
	const movie = new Movie({
		// title: req.body.title,
		// director: req.body.director,
		mov_id: req.body.mov_id,
		mov_name: req.body.mov_name,
		release_year: req.body.release_year,
		language: req.body.language,
	});

	// Save Movie in the database
	Movie.create(movie, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Movie.',
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
	// Create a Movie
	const movie = new Movie({
		// title: req.body.title,
		// director: req.body.director,
		mov_id: req.body.mov_id,
		mov_name: req.body.mov_name,
		release_year: req.body.release_year,
		language: req.body.language,
	});
	console.log(movie);
	// Save Movie in the database
	Movie.update(movie, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred while updating the Movie.',
			});
		else res.send(data);
	});
};



exports.getAll = (req, res) => {
	Movie.getAll((err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || 'Some error occurred',
			});
		else res.send(data);
	});
};

exports.getWithMov_id = (req,res) => {
	Movie.getWithMov_id(req.params.mov_id, (err,data) => {
		if(err)
			res.status(500).send({
				message: err.message || "Some error occurred",
			})
		else res.send(data);
	})
}

exports.getMoviesWithActorName = (req,res) => {
	Movie.getMoviesWithActorName(req.params.act_name, (err,data) => {
		if(err)
			res.status(500).send({
				message: err.message || "Some error occurred",
			})
		else res.send(data);
	})
}

exports.getMoviesWithDirectorName = (req,res) => {
	Movie.getMoviesWithDirectorName(req.params.dir_name, (err,data) => {
		if(err)
			res.status(500).send({
				message: err.message || "Some error occurred",
			})
		else res.send(data);
	})
}

exports.getMoviesWithReleaseYear = (req,res) => {
	Movie.getMoviesWithReleaseYear(req.params.release_year, (err,data) => {
		if(err)
			res.status(500).send({
				message: err.message || "Some error occurred",
			})
		else res.send(data);
	})
}

exports.getMoviesWithSongName = (req,res) => {
	Movie.getMoviesWithSongName(req.params.song_name, (err,data) => {
		if(err)
			res.status(500).send({
				message: err.message || "Some error occurred",
			})
		else res.send(data);
	})
}
	
exports.getMoviesWithStars = (req,res) => {
	Movie.getMoviesWithStars(req.params.stars, (err,data) => {
		if(err)
			res.status(500).send({
				message: err.message || "Some error occurred",
			})
		else res.send(data);
	})
}

exports.delete = (req,res) => {
	Movie.delete(req.params.mov_id, (err, data) => {
		if(err)
			res.send(500).send({
				message: err.message || "Some error occured",
			})
		else res.send(data);
	})
}