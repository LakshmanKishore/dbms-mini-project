import React, { Component } from 'react';
import MovieDataService from '../../services/movie.service';

export default class UpdateDirector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dir_id: '',
			dir_name: '',
			dir_age:"",
			dir_gender:'',
			allDirectors: {},
			directorsFetched: false,
			formVisible: false,
			submitted: false,
		};
	}

	onChangeDir_id = (e) => {
		this.setState({
			dir_id: e.target.value,
		});
	};

	onChangeDir_name = (e) => {
		this.setState({
			dir_name: e.target.value,
		});
	};

	onChangeDir_gender = (e) => {
		this.setState({
			dir_gender: e.target.value,
		});
	};

	onChangeDir_age = (e) => {
		this.setState({
			dir_age: e.target.value,
		});
	};

	updateDirector = () => {
		var data = {
			dir_id: this.state.dir_id,
			dir_name: this.state.dir_name,
			dir_age: this.state.dir_age,
			dir_gender: this.state.dir_gender,
		};

		MovieDataService.updateDirector(data)
			.then((response) => {
				this.setState({
					dir_id: response.data.dir_id,
					dir_name: response.data.dir_name,
					dir_age: response.data.dir_age,
					dir_gender: response.data.dir_gender,
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
			dir_id: '',
			dir_name: '',
			dir_age:'',
			dir_gender:'',
			allDirectors: {},
			directorsFetched: false,
			visibleForm: false,
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
		this.setState({
			dir_id: item.dir_id,
			dir_name: item.dir_name,
			dir_age: item.dir_age,
			dir_gender: item.dir_gender,
			formVisible: true,
		});
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
						<h4>You updated successfully!</h4>
						<button className="btn btn-success" onClick={this.newUpdate}>
							New Update
						</button>
					</div>
				) : (
					<div>
						<div>
							<h4>All Director details from the Database:</h4>
							{this.state.directorsFetched ? (
								<div>
									<table className="table table-border table-hover">
										<thead>
											<tr>
												<th scope="col">Director ID</th>
												<th scope="col">Director Name</th>
												<th scope="col">Director Age</th>
												<th scope="col">Director Gender </th>
											</tr>
										</thead>
										<tbody>
											{this.state.allDirectors.map((item) => (
												<tr
													onClick={() =>
														this.getParticularDirectorData(item)
													}
													key={item.dir_id}
												>
													<td>{item.dir_id}</td>
													<td>{item.dir_name}</td>
													<td>{item.dir_age}</td>
													<td>{item.dir_gender}</td>
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
									<label htmlFor="dir_name">Diector Name</label>
									<input
										type="text"
										className="form-control"
										id="dir_name"
										required
										value={this.state.dir_name}
										onChange={this.onChangeDir_name}
										name="dir_name"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="dir_age">Director Age</label>
									<input
										type="text"
										className="form-control"
										id="dir_age"
										required
										value={this.state.dir_age}
										onChange={this.onChangeDir_age}
										name="dir_age"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="dir_gender">Director Gender</label>
									<input
										type="text"
										className="form-control"
										id="dir_gender"
										required
										value={this.state.dir_gender}
										onChange={this.onChangeDir_gender}
										name="dir_gender"
									/>
								</div>

								<button onClick={this.updateDirector} className="btn btn-success">
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