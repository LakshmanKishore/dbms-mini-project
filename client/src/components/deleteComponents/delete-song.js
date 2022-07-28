import React, { Component } from 'react';
import MovieDataService from '../../services/movie.service';

export default class DeleteSong extends Component {
	constructor(props) {
		super(props);

		this.state = {
			song_id: '',
			allMovies: {},
			moviesFetched: false,
			allSongs: {},
			songsFetched: false,
			submitted: false,
		};
	}

	deleteSong = (song_id) => {
		MovieDataService.deleteSong(song_id)
			.then((response) => {
				this.setState({
					song_id: response.data.song_id,
					submitted: true,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	newDelete = () => {
		this.setState({
			song_id: '',
			allMovies: {},
			moviesFetched: false,
			allSongs: {},
			songsFetched: false,
			submitted: false,
		});
		this.getAllMovies();
		this.getAllSongs();
	};

	getAllMovies = () => {
		MovieDataService.getAllMovies()
			.then((response) => {
				this.setState({
					allMovies: response.data,
					moviesFetched: true,
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};
	
	getAllSongs = () => {
		MovieDataService.getAllSongs()
			.then((response) => {
				this.setState({
					allSongs: response.data,
					songsFetched:true,
				});
			})
			.catch((e) => {
				console.log(e);
			});
		
	};

	getParticularSongData = (item) => {
		this.setState({
			song_id: item.song_id,
		});
		this.deleteSong(item.song_id);
	};

	componentDidMount = () => {
		if (!this.moviesFetched) {
			this.getAllMovies();
		}
		if (!this.songsFetched) {
			this.getAllSongs();
		}
	};

	render() {
		return (
			<div className="submit-form">
				{this.state.submitted ? (
					<div>
						<h4>You deleted successfully!</h4>
						<button className="btn btn-success" onClick={this.newDelete}>
							Delete Another ?
						</button>
					</div>
				) : (
					<div>
						<div>
							<h4>All Movie details from the Database:</h4>
							{this.state.moviesFetched ? (
								<div>
									<table className="table table-border">
										<thead>
											<tr>
												<th scope="col">Movie ID</th>
												<th scope="col">Movie Name</th>
												<th scope="col">Movie Release Year</th>
												<th scope="col">Movie Language</th>
											</tr>
										</thead>
										<tbody>
											{this.state.allMovies.map((item) => (
												<tr key={item.mov_id}>
													<td>{item.mov_id}</td>
													<td>{item.mov_name}</td>
													<td>{item.release_year}</td>
													<td>{item.language}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<div className="loader"></div>
							)}
						</div>
						
						<div>
							<h4>All Songs details from the Database:</h4>
							{this.state.songsFetched ? (
								<div>
									<table className="table table-border table-hover">
										<thead>
											<tr>
												<th scope="col">Song ID</th>
												<th scope="col">Movie Id</th>
												<th scope="col">Song Name</th>
												<th scope="col">Singer</th>
												<th scope="col">Delete</th>
											</tr>
										</thead>
										<tbody>
											{this.state.allSongs.map((item) => (
												<tr key={item.song_id}>
													<td>{item.song_id}</td>
													<td>{item.mov_id}</td>
													<td>{item.song_name}</td>
													<td>{item.singer}</td>
													<td ><i onClick={() =>
														this.getParticularSongData(item)
													}  className="fa fa-trash"></i></td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								<div className="loader"></div>
							)}
						</div>

					</div>
				)}
			</div>
		);
	}
}