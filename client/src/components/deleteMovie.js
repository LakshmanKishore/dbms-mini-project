import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DeleteMovieNavbar() {
	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={'/delete/movie'} className="nav-link">
							Delete Movie
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/delete/actor'} className="nav-link">
							Delete Actor
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/delete/director'} className="nav-link">
							Delete Director
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/delete/review'} className="nav-link">
							Delete Review
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/delete/song'} className="nav-link">
							Delete Song
						</Link>
					</li>
				</div>
			</nav>
		</div>
	);
}

export default DeleteMovieNavbar;