import React, { Component } from 'react';
import MovieDataService from '../../services/movie.service';

export default class AddReview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mov_id: "",
			stars: "",
			comment: "",
			allMovies:{},
			moviesFetched:false,
			submitted: false
		};
	}
	
	onChangeMov_id = (e) => {
		this.setState({
			mov_id: e.target.value,
		});
	};
	
	onChangeStars = (e) => {
		this.setState({
			stars: e.target.value,
		})
	}
	
	onChangeComment = (e) => {
		this.setState({
			comment: e.target.value,
		})
	}
	
	saveReview = () => {
		var data = {
			mov_id: this.state.mov_id,
			stars: this.state.stars,
			comment: this.state.comment,
		};
		
		MovieDataService.createReview(data)
			.then((response) => {
				this.setState({
					act_id: response.data.act_id,
					stars: response.data.stars,
					comment: response.data.comment,
					submitted: true,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	
	newReview = () => {
		this.setState({
			mov_id: "",
			stars: "",
			comment: "",
			allMovies:{},
			moviesFetched:false,
			submitted: false
		});
		this.getAllMovies();
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
	
	componentDidMount = () => {
		if(!this.moviesFetched){
			this.getAllMovies();
		}
	}
	
	render() {
		return (
			<div className="submit-form">
				{this.state.submitted ? (
					<div>
						<h4>You submitted successfully!</h4>
						<button className="btn btn-success" onClick={this.newReview}>
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
					
						<button onClick={this.saveReview} className="btn btn-success">
							Submit
						</button>
					</div>
				)}
			</div>
		);
	}
}