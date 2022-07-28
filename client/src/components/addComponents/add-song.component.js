import React, { Component } from 'react';
import MovieDataService from '../../services/movie.service';

export default class AddSong extends Component {
	constructor(props) {
		super(props);

		this.state = {
			song_id: "",
			song_name: "",
			singer: "",
			mov_id: "",
			allMovies:{},
			moviesFetched:false,
			allSongs:{},
			songsFetched: false,
			submitted: false
		};
	}
	
	onChangeSong_id = (e) => {
		this.setState({
			song_id: e.target.value,
		});
	};
	
	onChangeSong_name = (e) => {
		this.setState({
			song_name: e.target.value,
		});
	};
	
	onChangeSinger = (e) => {
		this.setState({
			singer: e.target.value,
		});
	};
	
	onChangeMov_id = (e) => {
		this.setState({
			mov_id: e.target.value,
		});
	};
	
	saveSong = () => {
		var data = {
			song_id: this.state.song_id,
			song_name: this.state.song_name,
			singer: this.state.singer,
			mov_id: this.state.mov_id,
		};
		
		MovieDataService.createSong(data)
			.then((response) => {
				this.setState({
					song_id: response.data.song_id,
					song_name: response.data.song_name,
					singer: response.data.singer,
					mov_id: response.data.mov_id,
					submitted: true,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	
	newSong = () => {
		this.setState({
			song_id: "",
			song_name: "",
			singer: "",
			mov_id: "",
			allMovies:{},
			moviesFetched:false,
			allSongs:{},
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
					allMovies:response.data,
					moviesFetched:true,
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
	
	componentDidMount = () => {
		if(!this.moviesFetched){
			this.getAllMovies();
		}
		if(!this.songsFetched){
			this.getAllSongs();
		}
	}
	
	render() {
		return (
			<div className="submit-form">
				{this.state.submitted ? (
					<div>
						<h4>You submitted successfully!</h4>
						<button className="btn btn-success" onClick={this.newSong}>
							Add
						</button>
					</div>
				) : (
					<div>
						
						<div>
							<h4>All Movie details from the Database:</h4>
							{this.state.moviesFetched ? (
								<div>
									<table className="table table-border table-hover">
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
							) : <div className="loader"></div>}
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
											</tr>
										</thead>
										<tbody>
											{this.state.allSongs.map((item) => (
												<tr key={item.song_id}>
													<td>{item.song_id}</td>
													<td>{item.mov_id}</td>
													<td>{item.song_name}</td>
													<td>{item.singer}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : <div className="loader"></div>}
						</div>
						
						<div className="form-group">
							<label htmlFor="mov_id">Movie id</label>
							<input
								type="number"
								className="form-control"
								id="mov_id"
								required
								value={this.state.mov_id}
								onChange={this.onChangeMov_id}
								name="mov_id"
							/>
						</div>
						
						<div className="form-group">
							<label htmlFor="song_id">Song id</label>
							<input
								type="number"
								className="form-control"
								id="song_id"
								required
								value={this.state.song_id}
								onChange={this.onChangeSong_id}
								name="song_id"
							/>
						</div>
						
						<div className="form-group">
							<label htmlFor="song_name">Song name</label>
							<input
								type="text"
								className="form-control"
								id="song_name"
								required
								value={this.state.song_name}
								onChange={this.onChangeSong_name}
								name="song_name"
							/>
						</div>
						
						<div className="form-group">
							<label htmlFor="singer">Singer</label>
							<input
								type="text"
								className="form-control"
								id="singer"
								required
								value={this.state.singer}
								onChange={this.onChangeSinger}
								name="singer"
							/>
						</div>
						
						<button onClick={this.saveSong} className="btn btn-success">
							Submit
						</button>
					</div>
				)}
			</div>
		);
	}
}