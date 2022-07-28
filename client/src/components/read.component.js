import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from 'react-bootstrap';

import MoviesWithActorName from "./readComponents/moviesWithActorName.js";
import MoviesWithDirectorName from "./readComponents/moviesWithDirectorName.js";
import MoviesWithReleaseYear from "./readComponents/moviesWithReleaseYear.js";
import MoviesWithSongName from "./readComponents/moviesWithSongName.js";
import MoviesWithStars from "./readComponents/moviesWithStars.js";

export default function Read() {
	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header>
					1. Get the list of all the movies for a particular actor.
				</Accordion.Header>
				<Accordion.Body>
					<MoviesWithActorName />
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="1">
				<Accordion.Header>
					2. Get the list of all the movies for a particular director.
				</Accordion.Header>
				<Accordion.Body>
					<MoviesWithDirectorName />
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="2">
				<Accordion.Header>
					3. Get the list of all the movies for a particular release year.
				</Accordion.Header>
				<Accordion.Body>
					<MoviesWithReleaseYear />
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="3">
				<Accordion.Header>
					4. Get the movie name for an individual song name.
				</Accordion.Header>
				<Accordion.Body>
					<MoviesWithSongName />
				</Accordion.Body>
			</Accordion.Item>
			<Accordion.Item eventKey="4">
				<Accordion.Header>
					5. Get the list of movie names for some stars.
				</Accordion.Header>
				<Accordion.Body>
					<MoviesWithStars />
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}