import http from "../http-common";

class MovieDataService {
	
	createMovie(data) {
		return http.post("/api/movie/create/movie", data);
	}
	createActor(data) {
		return http.post("/api/movie/create/actor", data);
	}
	createDirector(data){
		return http.post("/api/movie/create/director",data);
	}
	createCasted(data){
		return http.post("/api/movie/create/casted",data);
	}
	createReview(data){
		return http.post("/api/movie/create/review",data);
	}
	createDirected(data){
		return http.post("/api/movie/create/directed",data);
	}
	createSong(data){
		return http.post("/api/movie/create/song",data);
	}
	
	
	get(id) {
		return http.get(`/movie/${id}`);
	}
	
	getWithMov_id(mov_id){
		return http.get(`/api/movie/details/${mov_id}`);
	}
	
	getAllMovies() {
		return http.get("/api/movie/");
	}
	getAllActors() {
		return http.get("/api/movie/actors");
	}
	getAllDirectors() {
		return http.get("/api/movie/directors");
	}
	getAllReviews() {
		return http.get("/api/movie/reviews");
	}
	getAllSongs() {
		return http.get("/api/movie/songs");
	}
	
	getMoviesWithActorName(act_name) {
		return http.get(`/api/movie/movielist/withactor/${act_name}`);
	}
	getMoviesWithDirectorName(dir_name) {
		return http.get(`/api/movie/movielist/withdirector/${dir_name}`);
	}
	getMoviesWithReleaseYear(release_year) {
		return http.get(`/api/movie/movielist/withrelease_year/${release_year}`);
	}
	getMoviesWithSongName(song_name) {
		return http.get(`/api/movie/movielist/withsong_name/${song_name}`);
	}
	getMoviesWithStars(stars) {
		return http.get(`/api/movie/movielist/withstars/${stars}`);
	}
	

	
	updateMovie(data){
		return http.post("/api/movie/update/movie",data);
	}
	updateDirector(data){
		return http.post("/api/movie/update/director",data);
	}
	updateActor(data){
		return http.post("/api/movie/update/actor",data);
	}
	updateReview(data){
		return http.post("/api/movie/update/review",data);
	}
	updateSong(data){
		return http.post("/api/movie/update/song",data);
	}

	
	deleteMovie(mov_id){
		return http.get(`/api/movie/delete/movie/${mov_id}`);
	}
	deleteActor(act_id){
		return http.get(`/api/movie/delete/actor/${act_id}`);
	}
	deleteDirector(dir_id){
		return http.get(`/api/movie/delete/director/${dir_id}`);
	}
	deleteReview(mov_id){
		return http.get(`/api/movie/delete/review/${mov_id}`);
	}
	deleteSong(song_id){
		return http.get(`/api/movie/delete/song/${song_id}`);
	}
}

export default new MovieDataService();