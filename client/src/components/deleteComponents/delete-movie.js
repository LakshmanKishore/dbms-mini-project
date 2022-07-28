import React, { Component } from 'react';
import MovieDataService from '../../services/movie.service';

export default class DeleteMovie extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mov_id: '',
			allMovies: {},
			moviesFetched: false,
			submitted: false,
		};
	}

	deleteMovie = (mov_id) => {
		MovieDataService.deleteMovie(mov_id)
			.then((response) => {
				this.setState({
					mov_id: response.data.mov_id,
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
			mov_id: '',
			allMovies: {},
			moviesFetched: false,
			submitted: false,
		});
		this.getAllMovies();
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

	getParticularMovieData = (item) => {
		console.log(item);
		this.setState({
			mov_id: item.mov_id,
		});
		this.deleteMovie(item.mov_id);
	};

	componentDidMount = () => {
		if (!this.moviesFetched) {
			this.getAllMovies();
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
												<th scope="col">Delete</th>
											</tr>
										</thead>
										<tbody>
											{this.state.allMovies.map((item) => (
												<tr key={item.mov_id}>
													<td>{item.mov_id}</td>
													<td>{item.mov_name}</td>
													<td>{item.release_year}</td>
													<td>{item.language}</td>
													<td ><i onClick={() =>
														this.getParticularMovieData(item)
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