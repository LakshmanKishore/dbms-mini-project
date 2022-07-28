import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateMovie() {
	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={'/create/movie'} className="nav-link">
							Add Movie
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/create/actor'} className="nav-link">
							Add Actor
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/create/director'} className="nav-link">
							Add Director
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/create/casted'} className="nav-link">
							Add Casted
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/create/directed'} className="nav-link">
							Add Directed
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/create/review'} className="nav-link">
							Add Review
						</Link>
					</li>
					<li className="nav-item">
						<Link to={'/create/song'} className="nav-link">
							Add Song
						</Link>
					</li>
				</div>
			</nav>
		</div>
	);
}

export default CreateMovie;