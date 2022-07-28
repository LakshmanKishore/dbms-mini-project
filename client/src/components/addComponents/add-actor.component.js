import React, { Component } from 'react';
import MovieDataService from '../../services/movie.service';

export default class AddActor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			act_id: '',
			act_name: '',
			act_age: '',
			act_gender: '',
			allActors: {},
			actorsFetched: false,
			submitted: false,
		};
	}

	onChangeAct_id = (e) => {
		this.setState({
			act_id: e.target.value,
		});
	};

	onChangeAct_name = (e) => {
		this.setState({
			act_name: e.target.value,
		});
	};

	onChangeAct_age = (e) => {
		this.setState({
			act_age: e.target.value,
		});
	};

	onChangeAct_gender = (e) => {
		this.setState({
			act_gender: e.target.value,
		});
	};

	saveActor = () => {
		var data = {
			act_id: this.state.act_id,
			act_name: this.state.act_name,
			act_age: this.state.act_age,
			act_gender: this.state.act_gender,
		};

		MovieDataService.createActor(data)
			.then((response) => {
				this.setState({
					act_id: response.data.act_id,
					act_name: response.data.act_name,
					act_age: response.data.act_age,
					act_gender: response.data.act_gender,
					submitted: true,
				});
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	newActor = () => {
		this.setState({
			act_id: '',
			act_name: '',
			act_age: '',
			act_gender: '',
			allActors: {},
			actorsFetched: false,
			submitted: false,
		});
		this.getAllActors();
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

	componentDidMount = () => {
		if (!this.actorsFetched){
			this.getAllActors();
		}
	};

	render() {
		return (
			<div className="submit-form">
				{this.state.submitted ? (
					<div>
						<h4>You submitted successfully!</h4>
						<button className="btn btn-success" onClick={this.newActor}>
							Add
						</button>
					</div>
				) : (
					<div>
						<div>
							<h4>All Actor Details from the Database:</h4>
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
							<label htmlFor="act_name">Actor name</label>
							<input
								type="text"
								className="form-control"
								id="act_name"
								required
								value={this.state.act_name}
								onChange={this.onChangeAct_name}
								name="act_name"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="act_age">Actor age</label>
							<input
								type="text"
								className="form-control"
								id="act_age"
								required
								value={this.state.act_age}
								onChange={this.onChangeAct_age}
								name="act_age"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="act_gender">Actor gender</label>
							<input
								type="text"
								className="form-control"
								id="act_gender"
								required
								value={this.state.act_gender}
								onChange={this.onChangeAct_gender}
								name="act_gender"
							/>
						</div>

						<button onClick={this.saveActor} className="btn btn-success">
							Submit
						</button>
					</div>
				)}
			</div>
		);
	}
}