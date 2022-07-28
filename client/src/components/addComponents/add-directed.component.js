import React, { Component } from "react";
import MovieDataService from '../../services/movie.service';

export default class AddDirected extends Component{
	constructor(props) {
		super(props);

		this.state = {
			dir_id: "",
			mov_id: "",
			allMovies: {},
			moviesFetched: false,
			allDirectors: {},
			directorsFetched: false,
			submitted: false
		};
	}
	
	onChangeDir_id = (e) => {
		this.setState({
			dir_id: e.target.value,
		});
	};
	
	
	onChangeMov_id = (e) => {
		this.setState({
			mov_id: e.target.value,
		});
	}
		
	saveDirected = () => {
		var data = {
			dir_id: this.state.dir_id,
			mov_id: this.state.mov_id,
		};
		MovieDataService.createDirected(data)
			.then((response) => {
				this.setState({
					dir_id: response.data.dir_id,
					mov_id: response.data.mov_id,
					submitted: true,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	
	newDirected = () => {
		this.setState({
			dir_id: "",
			mov_id: "",
			allMovies: "",
			moviesFetched: false,
			submitted: false,
		});
		this.getAllMovies();
	};
	
	componentDidMount = () => {
		if(!this.moviesFetched){
			this.getAllMovies();
		}
		if(!this.directorsFetched){
			this.getAllDirectors();
		}
	}
	
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
	
	getAllDirectors = () => {
		MovieDataService.getAllDirectors()
			.then((response) => {
				this.setState({
					allDirectors: response.data,
					directorsFetched: true,
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};
			
	render() {
		return (
			<div className="submit-form">
				{this.state.submitted ? (
					<div>
						<h4>You submitted successfully!</h4>
						<button className="btn btn-success" onClick={this.newDirected}>
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
							<h4>All Director Details from the Database:</h4>
							{this.state.directorsFetched ? (
								<div>
									<table className="table table-border table-hover">
										<thead>
											<tr>
												<th scope="col">Director ID</th>
												<th scope="col">Director Name</th>
												<th scope="col">Director Age</th>
												<th scope="col">Director Gender</th>
											</tr>
										</thead>
										<tbody>
											{this.state.allDirectors.map((item) => (
												<tr key={item.dir_id}>
													<td>{item.dir_id}</td>
													<td>{item.dir_name}</td>
													<td>{item.dir_age}</td>
													<td>{item.dir_gender}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : <div className="loader"></div>}
						</div>
						
						<div className="form-group">
							<label htmlFor="dir_name">Movie id</label>
							<input
								type="text"
								className="form-control"
								id="mov_id"
								required
								value={this.state.mov_id}
								onChange={this.onChangeMov_id}
								name="mov_id"
							/>
						</div>
						
						<div className="form-group">
							<label htmlFor="dir_id">Director id</label>
							<input
								type="text"
								className="form-control"
								id="dir_id"
								required
								value={this.state.dir_id}
								onChange={this.onChangeDir_id}
								name="dir_id"
							/>
						</div>

						<button onClick={this.saveDirected} className="btn btn-success">
							Submit
						</button>
					</div>
				)}
			</div>
		);
	}
}