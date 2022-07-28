import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateMovieNavbar() {
	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={'/update/movie'} className="nav-link">
							Update Movie
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/update/actor'} className="nav-link">
							Update Actor
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/update/director'} className="nav-link">
							Update Director
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/update/review'} className="nav-link">
							Update Review
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/update/song'} className="nav-link">
							Update Song
						</Link>
					</li>
				</div>
			</nav>
		</div>
	);
}

export default UpdateMovieNavbar;