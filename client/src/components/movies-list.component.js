import React, { Component } from 'react';
import MovieDataService from '../services/movie.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom';

export default class MoviesList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movies: [],
			navigate: false,
			movieDeleted: false,
			mov_id: '',
		};

		MovieDataService.getAllMovies()
			.then((response) => {
				this.setState({
					movies: response.data,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	handleClick = (mov_id) => {
		// alert("clicked "+mov_id)
		this.setState({
			navigate: true,
			mov_id: mov_id,
		});
	};

	handleDelete = (mov_id) => {
		this.setState({
			movieDeleted: true,
		});

		MovieDataService.deleteMovie(mov_id)
			.then((respone) => {
				console.log('movie deleted');
				this.setState({
					movieDeleted: false,
				});
			})
			.catch((e) => {
				console.log(e);
			});

		MovieDataService.getAllMovies()
			.then((response) => {
				this.setState({
					movies: response.data,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	render() {
		return (
			<div>
				{this.state.navigate ? <Navigate push to={`/view/${this.state.mov_id}`} /> : null}
				<div className="row">
					{this.state.movies.length !== 0 &&
						this.state.movies.map(({ mov_id, mov_name, language, release_year }) => (
							<div key={mov_id} className="col-4">
								<div className="card m-2" style={{ width: '18rem' }}>
									<div className="card-body">
										<h5 className="card-title d-flex justify-content-between ">
											<span>{mov_name}</span>
										</h5>
										<h6 className="card-subtitle mb-2 text-muted">
											{language}
										</h6>
										<p className="card-text">{release_year}</p>
										<div
											onClick={() => this.handleClick(mov_id)}
											className="btn btn-success"
										>
											Movie Details
										</div>{' '}
										<div
											onClick={() => this.handleDelete(mov_id)}
											className="btn btn-danger"
										>
											Delete Movie
										</div>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		);
	}
}