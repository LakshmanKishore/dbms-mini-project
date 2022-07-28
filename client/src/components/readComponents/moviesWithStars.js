import React, { useState } from 'react';
import MovieDataService from '../../services/movie.service';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MoviesWithStars() {
	const [state, setState] = useState({
		stars: '',
		loader: false,
	});
	const [movies, setMovies] = useState({ data: [], fetched: false });

	const onChangeStars = (e) => {
		setState({
			...state,
			stars: e.target.value,
		});
	};

	const getMoviesWithStars = () => {
		if (state.stars.length === 0) {
			alert('Please Enter Number of Stars.');
			return;
		}
		setState({
			...state,
			loader:true,
		})
		MovieDataService.getMoviesWithStars(state.stars)
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
				<label htmlFor="stars">Enter the Number of stars (1-5) : </label>{' '}
				<input
					type="text"
					id="stars"
					value={state.stars}
					onChange={onChangeStars}
					name="stars"
					required
				/>{' '}
				<button onClick={getMoviesWithStars} className="btn btn-success">
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