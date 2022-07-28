import React, { Component } from 'react';
import MovieDataService from '../../services/movie.service';

export default class UpdateMovie extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mov_id: '',
			mov_name: '',
			release_year: '',
			language: '',
			allMovies: {},
			moviesFetched: false,
			formVisible: false,
			submitted: false,
		};
	}

	onChangeMov_id = (e) => {
		this.setState({
			mov_id: e.target.value,
		});
	};

	onChangeMov_name = (e) => {
		this.setState({
			mov_name: e.target.value,
		});
	};

	onChangeRelease_year = (e) => {
		this.setState({
			release_year: e.target.value,
		});
	};

	onChangeLanguage = (e) => {
		this.setState({
			language: e.target.value,
		});
	};

	updateMovie = () => {
		var data = {
			mov_id: this.state.mov_id,
			mov_name: this.state.mov_name,
			release_year: this.state.release_year,
			language: this.state.language,
		};

		MovieDataService.updateMovie(data)
			.then((response) => {
				this.setState({
					mov_id: response.data.mov_id,
					mov_name: response.data.mov_name,
					release_year: response.data.release_year,
					language: response.data.language,
					submitted: true,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	newUpdate = () => {
		this.setState({
			mov_id: '',
			mov_name: '',
			release_year: '',
			language: '',
			allMovies: {},
			moviesFetched: false,
			formVisible: false,
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
		this.setState({
			mov_id: item.mov_id,
			mov_name: item.mov_name,
			release_year: item.release_year,
			language: item.language,
			formVisible: true,
		});
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
						<h4>You updated successfully!</h4>
						<button className="btn btn-success" onClick={this.newUpdate}>
							New Update
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
												<tr
													onClick={() =>
														this.getParticularMovieData(item)
													}
													key={item.mov_id}
												>
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

						{this.state.formVisible && (
							<div>
								<div className="form-group">
									<label htmlFor="mov_name">Movie Name</label>
									<input
										type="text"
										className="form-control"
										id="mov_name"
										required
										value={this.state.mov_name}
										onChange={this.onChangeMov_name}
										name="mov_name"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="release_year">Release Year</label>
									<input
										type="text"
										className="form-control"
										id="release_year"
										required
										value={this.state.release_year}
										onChange={this.onChangeRelease_year}
										name="release_year"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="language">Language</label>
									<input
										type="text"
										className="form-control"
										id="language"
										required
										value={this.state.language}
										onChange={this.onChangeLanguage}
										name="language"
									/>
								</div>

								<button onClick={this.updateMovie} className="btn btn-success">
									Update
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}