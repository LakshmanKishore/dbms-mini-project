import React, { Component } from 'react';
import MovieDataService from '../../services/movie.service';

export default class DeleteDirector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dir_id: '',
			allDirectors: {},
			directorsFetched: false,
			submitted: false,
		};
	}

	deleteDirector = (dir_id) => {
		MovieDataService.deleteDirector(dir_id)
			.then((response) => {
				this.setState({
					dir_id: response.data.dir_id,
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
			dir_id: '',
			allDirectors: {},
			directorsFetched: false,
			submitted: false,
		});
		this.getAllDirectors();
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

	getParticularDirectorData = (item) => {
		console.log(item);
		this.setState({
			dir_id: item.dir_id,
		});
		this.deleteDirector(item.dir_id);
	};

	componentDidMount = () => {
		if (!this.directorsFetched) {
			this.getAllDirectors();
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
							<h4>All Director details from the Database:</h4>
							{this.state.directorsFetched ? (
								<div>
									<table className="table table-border">
										<thead>
											<tr>
												<th scope="col">Director ID</th>
												<th scope="col">Director Name</th>
												<th scope="col">Director Age</th>
												<th scope="col">Director Gender</th>
												<th scope="col">Delete</th>
											</tr>
										</thead>
										<tbody>
											{this.state.allDirectors.map((item) => (
												<tr key={item.dir_id}>
													<td>{item.dir_id}</td>
													<td>{item.dir_name}</td>
													<td>{item.dir_age}</td>
													<td>{item.dir_gender}</td>
													<td ><i onClick={() =>
														this.getParticularDirectorData(item)
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