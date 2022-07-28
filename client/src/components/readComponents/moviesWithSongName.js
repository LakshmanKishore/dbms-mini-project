import React, { useState } from 'react';
import MovieDataService from '../../services/movie.service';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MoviesWithSongName() {
	const [state, setState] = useState({
		song_name: '',
		loader: false,
	});
	const [movies, setMovies] = useState({ data: [], fetched: false });

	const onChangeSongName = (e) => {
		setState({
			...state,
			song_name: e.target.value,
		});
	};

	const getMoviesWithSongName = () => {
		if (state.song_name.length === 0) {
			alert('Please Enter Song Name.');
			return;
		}
		setState({
			...state,
			loader:true,
		})
		MovieDataService.getMoviesWithSongName(state.song_name)
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
				<label htmlFor="song_name">Enter the Song Name : </label>{' '}
				<input
					type="text"
					id="song_name"
					value={state.song_name}
					onChange={onChangeSongName}
					name="song_name"
					required
				/>{' '}
				<button onClick={getMoviesWithSongName} className="btn btn-success">
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