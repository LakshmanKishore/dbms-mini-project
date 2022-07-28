import React, { Component } from 'react';
import MovieDataService from '../../services/movie.service';

export default class UpdateReview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mov_id: '',
			stars: '',
			comment: '',
			allMovies: {},
			moviesFetched: false,
			allReviews: {},
			reviewsFetched: false,
			formVisible: false,
			submitted: false,
		};
	}

	onChangeStars = (e) => {
		this.setState({
			stars: e.target.value,
		});
	};

	onChangeComment = (e) => {
		this.setState({
			comment: e.target.value,
		});
	};

	updateReview = () => {
		var data = {
			mov_id: this.state.mov_id,
			stars: this.state.stars,
			comment: this.state.comment,
		};

		MovieDataService.updateReview(data)
			.then((response) => {
				this.setState({
					act_id: response.data.act_id,
					stars: response.data.stars,
					comment: response.data.comment,
					submitted: true,
				});
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
			allReviews: {},
			reviewsFetched: false,
			formVisible: false,
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
			stars: item.stars,
			comment: item.comment,
			formVisible: true,
		});
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
											</tr>
										</thead>
										<tbody>
											{this.state.allReviews.map((item) => (
												<tr
													onClick={() =>
														this.getParticularReviewData(item)
													}
													key={item.mov_id}
												>
													<td>{item.mov_id}</td>
													<td>{item.stars}</td>
													<td>{item.comment}</td>
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
									<label htmlFor="stars">Stars</label>
									<input
										type="number"
										min="1"
										max="5"
										className="form-control"
										id="stars"
										required
										value={this.state.stars}
										onChange={this.onChangeStars}
										name="stars"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="comment">Comment</label>
									<textarea
										type="text"
										className="form-control"
										id="comment"
										required
										value={this.state.comment}
										onChange={this.onChangeComment}
										name="comment"
									/>
								</div>

								<button onClick={this.updateReview} className="btn btn-success">
									Submit
								</button>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}