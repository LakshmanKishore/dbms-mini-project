import React, { useState } from 'react';
import MovieDataService from '../../services/movie.service';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MoviesWithActorName() {
	const [state, setState] = useState({
		act_name: '',
		loader: false,
	});
	const [movies, setMovies] = useState({ data: [], fetched: false });

	const onChangeAct_name = (e) => {
		setState({
			...state,
			act_name: e.target.value,
		});
	};

	const getMoviesWithActorName = () => {
		if (state.act_name.length === 0) {
			alert('Please Enter Actor Name.');
			return;
		}
		setState({
			...state,
			loader:true,
		})
		MovieDataService.getMoviesWithActorName(state.act_name)
			.then((response) => {
				setMovies({ data: response.data, fetched: true });
				setState({
					...state,
					loader:false,	
				})
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div>
			<div>
				<label htmlFor="act_name">Enter the Actor Name : </label>{' '}
				<input
					type="text"
					id="act_name"
					value={state.act_name}
					onChange={onChangeAct_name}
					name="act_name"
					required
				/>{' '}
				<button onClick={getMoviesWithActorName} className="btn btn-success">
					Submit
				</button>
			</div>
			{state.loader && <div className="loader"></div>}
			<div>
				{movies.data.length !== 0 && movies.fetched && (
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
								{movies.data.map((item) => (
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
				)}
				{movies.data.length === 0 && movies.fetched && <div>No Movies found </div>}
			</div>
		</div>
	);
}