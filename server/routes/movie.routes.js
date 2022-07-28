module.exports = app => {
	const movie = require("../controllers/movie.controller.js");
	const actor = require("../controllers/actor.controller.js");
	const director = require("../controllers/director.controller.js");
	const casted = require("../controllers/casted.controller.js");
	const directed = require("../controllers/directed.controller.js");
	const review = require("../controllers/review.controller.js");
	const song = require("../controllers/song.controller.js");
	
	var router = require("express").Router();
	
	router.post("/create/movie",movie.create);
	router.post("/create/actor",actor.create);
	router.post("/create/director",director.create);
	router.post("/create/casted",casted.create);
	router.post("/create/directed",directed.create);
	router.post("/create/review",review.create);
	router.post("/create/song",song.create);
	
	router.post("/update/movie",movie.update);
	router.post("/update/director",director.update);
	router.post("/update/actor",actor.update);
	router.post("/update/review",review.update);
	router.post("/update/song",song.update);
	
	router.get('/details/:mov_id',movie.getWithMov_id);
	router.get("/",movie.getAll); // Gets All Movies list.
	router.get("/actors",actor.getAllActors);
	router.get("/directors",director.getAllDirectors);
	router.get("/reviews",review.getAllReviews);
	router.get("/songs",song.getAllSongs);
	
	router.get("/movielist/withactor/:act_name",movie.getMoviesWithActorName);
	router.get("/movielist/withdirector/:dir_name",movie.getMoviesWithDirectorName);
	router.get("/movielist/withrelease_year/:release_year",movie.getMoviesWithReleaseYear);
	router.get("/movielist/withsong_name/:song_name",movie.getMoviesWithSongName);
	router.get("/movielist/withstars/:stars",movie.getMoviesWithStars);
	
	router.get("/delete/movie/:mov_id",movie.delete);
	router.get("/delete/actor/:act_id",actor.delete);
	router.get("/delete/director/:dir_id",director.delete);
	router.get("/delete/review/:mov_id",review.delete);
	router.get("/delete/song/:song_id",song.delete);
	
	app.use('/api/movie',router);
	
}
