const sql = require('./db.js');

// constructor
const Movie = function (movie) {
	this.mov_id = movie.mov_id;
	this.mov_name = movie.mov_name;
	this.release_year = movie.release_year;
	this.language = movie.language;
};

Movie.create = (newMovie, result) => {
	sql.query('Insert into movie set ?', newMovie, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}

		console.log('Created movie:', { id: res.insertId, ...newMovie });
		result(null, { id: res.insertId, ...newMovie });
	});
};

Movie.update = (updateMovie,result) =>{
	sql.query(`update movie set mov_name="${updateMovie.mov_name}", release_year= "${updateMovie.release_year}", language="${updateMovie.language}" where mov_id="${updateMovie.mov_id}"`, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}

		console.log('Updated movie:', { id: res.insertId, ...updateMovie });
		result(null, { id: res.insertId, ...updateMovie });
	});
}

Movie.getAll = (result) => {
	sql.query('Select * from movie', (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		// console.log("All Movies:",res);
		result(null, res);
	});
};

Movie.getWithMov_id = (mov_id, result) => {
	// Create a stored procedure to access all the details of actor, director, ... with movie id and call in sql query
	// sql.query(`Select * from movie m, actor a, casted c where m.mov_id=${mov_id} and c.mov_id= m.mov_id and c.act_id = a.act_id`,(err,res) => {
	sql.query(`call getWithMov_id(${mov_id})`, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		// console.log("Single Movie:",res);
		result(null, res);
	});
};

Movie.getMoviesWithActorName = (act_name, result) => {
	sql.query(
		`select * from movie where mov_id IN (select c.mov_id from casted c where c.act_id IN (select act_id from actor where act_name="${act_name}"));`,
		(err, res) => {
			if (err) {
				console.log(err);
				result(err, null);
				return;
			}
			result(null, res);
		}
	);
};

Movie.getMoviesWithDirectorName = (dir_name, result) => {
	sql.query(
		`select * from movie where mov_id IN (select d.mov_id from directed d where d.dir_id IN (select dir_id from director where dir_name="${dir_name}"));`,
		(err, res) => {
			if (err) {
				console.log(err);
				result(err, null);
				return;
			}
			result(null, res);
		}
	);
};

Movie.getMoviesWithReleaseYear = (release_year, result) => {
	sql.query(
		`select * from movie where release_year="${release_year}"`,
		(err, res) => {
			if (err) {
				console.log(err);
				result(err, null);
				return;
			}
			result(null, res);
		}
	);
};

Movie.getMoviesWithSongName = (song_name, result) => {
	sql.query(
		`select * from movie m, song s where m.mov_id=s.mov_id and s.song_name="${song_name}"`,
		(err, res) => {
			if (err) {
				console.log(err);
				result(err, null);
				return;
			}
			result(null, res);
		}
	);
};

Movie.getMoviesWithStars = (stars, result) => {
	sql.query(
		`select * from movie m, review r where m.mov_id=r.mov_id and r.stars="${stars}"`,
		(err, res) => {
			if (err) {
				console.log(err);
				result(err, null);
				return;
			}
			result(null, res);
		}
	);
};



Movie.delete = (mov_id, result) => {
	sql.query(`delete from movie where mov_id = ${mov_id}`, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, res);
	});
};

// SELECT s.name as Student, c.name as Course
// FROM student s
//     INNER JOIN bridge b ON s.id = b.sid
//     INNER JOIN course c ON b.cid  = c.id
// ORDER BY s.name

// CREATE PROCEDURE get_merit_student ()
// BEGIN
//     SELECT * FROM student_info WHERE marks > 70;
//     SELECT COUNT(stud_code) AS Total_Student FROM student_info;
// END &&

// DELIMITER &&
// CREATE PROCEDURE get_student (IN var1 INT)
// BEGIN
//     SELECT * FROM student_info LIMIT var1;
//     SELECT COUNT(stud_code) AS Total_Student FROM student_info;
// END &&
// DELIMITER ;

module.exports = Movie;