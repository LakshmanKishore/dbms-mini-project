import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movie.service';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useParams } from 'react-router-dom';
// https://v5.reactrouter.com/web/api/Hooks/useparams

export default function SingleMovie() {
	const [movie, setMovie] = useState({ data: '' });
	const [actor, setActor] = useState({ data: '' });
	const [director, setDirector] = useState({ data: '' });
	const [song, setSong] = useState({ data: '' });
	const [review, setReview] = useState({ data: '' });
	const [fetched, setFetched] = useState(false);
	
	const stars = {
		1: "★☆☆☆☆",
		2: "★★☆☆☆",
		3: "★★★☆☆",
		4: "★★★★☆",
		5: "★★★★★",
	};

	const params = useParams();

	useEffect(() => {
		const getWithMov_id = (mov_id) => {
			MovieDataService.getWithMov_id(mov_id)
				.then((response) => {
					console.log(response);
					setMovie({ data: response.data[0] });
					setActor({ data: response.data[1] });
					setDirector({ data: response.data[2] });
					setSong({ data: response.data[3] });
					setReview({ data: response.data[4] });
					setFetched(true);
				})
				.catch((e) => {
					console.log(e);
				});
		};
		if (fetched === false) {
			getWithMov_id(params.mov_id);
		}
	});

	return (
		<div>
			{fetched && movie.data.length !== 0 ? (
				<div>
					<h3>Movie Name : {movie.data[0].mov_name.toUpperCase()}</h3>
					<h3>Movie Language : {movie.data[0].language}</h3>
					<h3>Movie Release year : {movie.data[0].release_year}</h3>
				</div>
			) : (
				<div>No Movie with the given ID</div>
			)}
			<hr />
			{fetched && actor.data.length !== 0 ? (
				<div>
					<h3>Actors involved:</h3>
					<table className="table table-border table-hover">
						<thead>
							<tr>
								<th scope="col">Actor Name</th>
								<th scope="col">Actor Age</th>
								<th scope="col">Actor Gender</th>
								<th scope="col">Role</th>
							</tr>
						</thead>
						<tbody>
							{actor.data.map((item) => (
								<tr key={item.act_id}>
									<td>{item.act_name}</td>
									<td>{item.act_age}</td>
									<td>{item.act_gender}</td>
									<td>{item.role}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div>No Actors found in the Database for this movie.</div>
			)}
			<hr />
			{fetched && director.data.length !== 0 ? (
				<div>
					<h3>Director Name : {director.data[0].dir_name}</h3>
					<h3>Director Age : {director.data[0].dir_age}</h3>
					<h3>Director Gender : {director.data[0].dir_gender}</h3>
				</div>
			) : (
				<div>No Director found in the Database for this movie.</div>
			)}
			<hr />
			{fetched && song.data.length !== 0 ? (
				<div>
					<h3>Songs List:</h3>
					<table className="table table-border table-hover">
						<thead>
							<tr>
								<th scope="col">Sl.No</th>
								<th scope="col">Song Name</th>
								<th scope="col">Singer</th>
							</tr>
						</thead>
						<tbody>
							{song.data.map((item, index) => (
								<tr key={index + 1}>
									<td>{index + 1}</td>
									<td>{item.song_name}</td>
									<td>{item.singer}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div>No Songs found in the Database for this movie.</div>
			)}
			<hr />
			{fetched && review.data.length !== 0 ? (
				<div>
				<h4>Review:</h4>
				{review.data.map((item, index) => (
					<div key={index} className="card bg-light m-2" style={{ width: '18rem' }}>
						<h5 className="card-header"><b>Stars: {stars[item.stars]}</b></h5>
						<div className="card-body">
							<h5 className="card-title">Comment:</h5>
							<p className="card-text">{item.comment}</p>
						</div>
					</div>
				))}
				</div>
			) : (
				<div>No Review found in the Database for this movie.</div>
			)}
			<br />
			<br />
		</div>
	);
}