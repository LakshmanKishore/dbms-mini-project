import './App.css';
import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import MoviesList from './components/movies-list.component';
import CreateMovie from './components/createMovie';
import UpdateMovieNavbar from './components/updateMovie';
import SingleMovie from './components/singleMovie.component';
import About from './components/about.component';
import Read from './components/read.component';
import DeleteMovieNavbar from './components/deleteMovie';

import AddMovie from './components/addComponents/add-movie.component';
import AddActor from './components/addComponents/add-actor.component';
import AddDirector from './components/addComponents/add-director.component';
import AddCasted from './components/addComponents/add-casted.component';
import AddReview from './components/addComponents/add-review.component';
import AddDirected from './components/addComponents/add-directed.component';
import AddSong from './components/addComponents/add-song.component';

import UpdateMovie from "./components/updateComponents/update-movie";
import UpdateActor from "./components/updateComponents/update-actor";
import UpdateDirector from "./components/updateComponents/update-director";
import UpdateReview from "./components/updateComponents/update-review";
import UpdateSong from "./components/updateComponents/update-song";

import DeleteMovie from './components/deleteComponents/delete-movie';
import DeleteActor from "./components/deleteComponents/delete-actor";
import DeleteDirector from "./components/deleteComponents/delete-director";
import DeleteReview from './components/deleteComponents/delete-review';
import DeleteSong from './components/deleteComponents/delete-song';

// https://www.bezkoder.com/react-node-express-mysql/
// https://www.bezkoder.com/react-crud-web-api/
// https://blog.logrocket.com/react-router-dom-tutorial-examples/

// triggers for movie year and  review ratings


class App extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to={'/'} className="nav-link">
								Movies
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/create'} className="nav-link">
								Create Data
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/read'} className="nav-link">
								Read Data
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/update'} className="nav-link">
								Update Data
							</Link>
						</li><li className="nav-item">
							<Link to={'/delete'} className="nav-link">
								Delete Data
							</Link>
						</li>
					</div>
				</nav>

				<div className="container mt-3">
					<Routes>
						<Route exact path="/" element={<MoviesList />} />
						<Route path="/create" element={<CreateMovie />} />
						<Route
							path="/create/movie"
							element={
								<div>
									<CreateMovie />
									<AddMovie />
								</div>
							}
						/>
						<Route
							path="/create/actor"
							element={
								<div>
									<CreateMovie />
									<AddActor />
								</div>
							}
						/>
						<Route
							path="/create/director"
							element={
								<div>
									<CreateMovie />
									<AddDirector />
								</div>
							}
						/>
						<Route
							path="/create/casted"
							element={
								<div>
									<CreateMovie />
									<AddCasted />
								</div>
							}
						/>
						<Route
							path="/create/review"
							element={
								<div>
									<CreateMovie />
									<AddReview />
								</div>
							}
						/>
						<Route
							path="/create/directed"
							element={
								<div>
									<CreateMovie />
									<AddDirected />
								</div>
							}
						/>
						<Route
							path="/create/song"
							element={
								<div>
									<CreateMovie />
									<AddSong />
								</div>
							}
						/>
						
						<Route path="/update" element={<UpdateMovieNavbar />} />
						<Route
							path="/update/movie"
							element={
								<div>
									<UpdateMovieNavbar />
									<UpdateMovie />
								</div>
							}
						/>	
						<Route
							path="/update/director"
							element={
								<div>
									<UpdateMovieNavbar />
									<UpdateDirector />
								</div>
							}
						/>
						<Route
							path="/update/review"
							element={
								<div>
									<UpdateMovieNavbar />
									<UpdateReview />
								</div>
							}
						/>
						<Route
							path="/update/actor"
							element={
								<div>
									<UpdateMovieNavbar />
									<UpdateActor />
								</div>
							}
						/>
						<Route
							path="/update/song"
							element={
								<div>
									<UpdateMovieNavbar />
									<UpdateSong />
								</div>
							}
						/>
						
						<Route path="/delete" element={<DeleteMovieNavbar />} />
						<Route
							path="/delete/movie"
							element={
								<div>
									<DeleteMovieNavbar />
									<DeleteMovie />
								</div>
							}
						/>
						
						<Route
							path="/delete/actor"
							element={
								<div>
									<DeleteMovieNavbar />
									<DeleteActor />
								</div>
							}
						/>
						<Route
							path="/delete/director"
							element={
								<div>
									<DeleteMovieNavbar />
									<DeleteDirector />
								</div>
							}
						/>
						<Route
							path="/delete/review"
							element={
								<div>
									<DeleteMovieNavbar />
									<DeleteReview />
								</div>
							}
						/>
						<Route
							path="/delete/song"
							element={
								<div>
									<DeleteMovieNavbar />
									<DeleteSong />
								</div>
							}
						/>
						
						<Route path="/about/:id" element={<About />}/>
						<Route path="/view/:mov_id" element={<SingleMovie />} />
						<Route path="/read" element={<Read />} />
					</Routes>
				</div>
			</div>
		);
	}
}

export default App;