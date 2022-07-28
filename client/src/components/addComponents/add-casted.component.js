import React, { Component } from 'react';
import MovieDataService from '../../services/movie.service';

export default class AddCasted extends Component {
	constructor(props) {
		super(props);

		this.state = {
			act_id: "",
			mov_id: "",
			role: "",
			allMovies:{},
			moviesFetched:false,
			allActors:{},
			actorsFetched:false,
			submitted: false
		};
	}
	
	onChangeAct_id = (e) => {
		this.setState({
			act_id: e.target.value,
		});
	};
	
	onChangeMov_id = (e) => {
		this.setState({
			mov_id: e.target.value,
		});
	};
	
	onChangeRole = (e) => {
		this.setState({
			role: e.target.value,
		})
	}
	
	saveCasted = () => {
		var data = {
			act_id: this.state.act_id,
			mov_id: this.state.mov_id,
			role: this.state.role,
		};
		
		MovieDataService.createCasted(data)
			.then((response) => {
				this.setState({
					act_id: response.data.act_id,
					mov_id: response.data.mov_id,
					role: response.data.role,
					submitted: true,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	
	newCasted = () => {
		this.setState({
			act_id: "",
			mov_id: "",
			role: "",
			allMovies:{},
			moviesFetched:false,
			allActors:{},
			actorsFetched:false,
			submitted: false
		});
		this.getAllActors();
		this.getAllMovies();
	};
	
	getAllActors = () => {
		MovieDataService.getAllActors()
			.then((response) => {
				this.setState({
					allActors: response.data,
					actorsFetched: true,
				});
			})
			.catch((e) => {
				console.log(e);
			});
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
		if(!this.actorsFetched){
			this.getAllActors();
		}
	}
	
	render() {
		return (
			<div className="submit-form">
				{this.state.submitted ? (
					<div>
						<h4>You submitted successfully!</h4>
						<button className="btn btn-success" onClick={this.newCasted}>
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
							<h4>All Actor details from the Database:</h4>
							{this.state.actorsFetched ? (
								<div>
									<table className="table table-border table-hover">
										<thead>
											<tr>
												<th scope="col">Actor ID</th>
												<th scope="col">Actor Name</th>
												<th scope="col">Actor Age</th>
												<th scope="col">Actor Gender</th>
											</tr>
										</thead>
										<tbody>
											{this.state.allActors.map((item) => (
												<tr key={item.act_id}>
													<td>{item.act_id}</td>
													<td>{item.act_name}</td>
													<td>{item.act_age}</td>
													<td>{item.act_gender}</td>
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
							<label htmlFor="act_id">Actor id</label>
							<input
								type="text"
								className="form-control"
								id="act_id"
								required
								value={this.state.act_id}
								onChange={this.onChangeAct_id}
								name="act_id"
							/>
						</div>
						
						<div className="form-group">
							<label htmlFor="role">Role</label>
							<input
								type="text"
								className="form-control"
								id="role"
								required
								value={this.state.role}
								onChange={this.onChangeRole}
								name="role"
							/>
						</div>

						<button onClick={this.saveCasted} className="btn btn-success">
							Submit
						</button>
					</div>
				)}
			</div>
		);
	}
}