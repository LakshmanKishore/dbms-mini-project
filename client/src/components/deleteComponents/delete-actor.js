import React, { Component } from 'react';
import MovieDataService from '../../services/movie.service';

export default class DeleteActor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			act_id: '',
			allActors: {},
			actorsFetched: false,
			submitted: false,
		};
	}

	deleteActor = (act_id) => {
		MovieDataService.deleteActor(act_id)
			.then((response) => {
				this.setState({
					act_id: response.data.act_id,
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
			act_id: '',
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

	getParticularActorData = (item) => {
		console.log(item);
		this.setState({
			act_id: item.act_id,
		});
		this.deleteActor(item.act_id);
	};

	componentDidMount = () => {
		if (!this.actorsFetched) {
			this.getAllActors();
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
							<h4>All Actor details from the Database:</h4>
							{this.state.actorsFetched ? (
								<div>
									<table className="table table-border">
										<thead>
											<tr>
												<th scope="col">Actor ID</th>
												<th scope="col">Actor Name</th>
												<th scope="col">Actor Age</th>
												<th scope="col">Actor Gender</th>
												<th scope="col">Delete</th>
											</tr>
										</thead>
										<tbody>
											{this.state.allActors.map((item) => (
												<tr key={item.act_id}>
													<td>{item.act_id}</td>
													<td>{item.act_name}</td>
													<td>{item.act_age}</td>
													<td>{item.act_gender}</td>
													<td ><i onClick={() =>
														this.getParticularActorData(item)
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