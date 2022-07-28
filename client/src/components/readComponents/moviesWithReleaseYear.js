import React, { useState } from 'react';
import MovieDataService from '../../services/movie.service';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MoviesWithReleaseYear() {
	const [state, setState] = useState({
		release_year: '',
		loader: false,
	});
	const [movies, setMovies] = useState({ data: [], fetched: false });

	const onChangeReleaseYear = (e) => {
		setState({
			...state,
			release_year: e.target.value,
		});
	};

	const getMoviesWithReleaseYear = () => {
		if (state.release_year.length === 0) {
			alert('Please Enter Release Year.');
			return;
		}
		setState({
			...state,
			loader:true,
		})
		MovieDataService.getMoviesWithReleaseYear(state.release_year)
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
				<label htmlFor="release_year">Enter the Release Year : </label>{' '}
				<input
					type="text"
					id="release_year"
					value={state.release_year}
					onChange={onChangeReleaseYear}
					name="release_year"
					required
				/>{' '}
				<button onClick={getMoviesWithReleaseYear} className="btn btn-success">
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