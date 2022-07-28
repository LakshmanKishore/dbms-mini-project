import React, { Component } from 'react';
import MovieDataService from '../../services/movie.service';

export default class DeleteReview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mov_id: '',
			allMovies: {},
			moviesFetched: false,
			allReviews: {},
			reviewsFetched: false,
			submitted: false,
		};
	}

	deleteReview = (mov_id) => {
		MovieDataService.deleteReview(mov_id)
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
			allReviews: {},
			reviewsFetched: false,
			submitted: false,
		});
		this.getAllMovies();
		this.getAllReviews();
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
	
	getAllReviews = () => {
		MovieDataService.getAllReviews()
			.then((response) => {
				this.setState({
					allReviews: response.data,
					reviewsFetched: true,
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	getParticularReviewData = (item) => {
		this.setState({
			mov_id: item.mov_id,
			formVisible: true,
		});
		this.deleteReview(item.mov_id);
	};

	componentDidMount = () => {
		if (!this.moviesFetched) {
			this.getAllMovies();
		}
		if (!this.reviewsFetched) {
			this.getAllReviews();
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
							<h4>All Review details from the Database:</h4>
							{this.state.reviewsFetched ? (
								<div>
									<table className="table table-border table-hover">
										<thead>
											<tr>
												<th scope="col">Movie ID</th>
												<th scope="col">Stars</th>
												<th scope="col">Comment</th>
												<th scope="col">Delete</th>
											</tr>
										</thead>
										<tbody>
											{this.state.allReviews.map((item) => (
												<tr key={item.mov_id} >
													<td>{item.mov_id}</td>
													<td>{item.stars}</td>
													<td>{item.comment}</td>
													<td ><i onClick={() =>
														this.getParticularReviewData(item)
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