/*
 * fecapp
 *
 * catalog.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { Fragment, useEffect, useState } from 'react';

import MovieCard from '../components/movie-card.js';
import apiRequest from '../request.js';

/**
 * @function Catalog - React view component for retrieving and displaying movies
 * @returns {Object} - React JSX view
 */
export default function Catalog() {
  /**
   * Use local, component state for movies. Though, this could be moved to
   * the global state if that's prefered over doing API calls in React views
   */
  const [movies, setMovies] = useState([]);
  const Movies = !movies.length ? (
    <p>Loading movie catalog ...</p>
  ) : (
    <ul>
      {movies.map(function (movie) {
        return <MovieCard key={movie.imdbID} movie={movie} />;
      })}
    </ul>
  );

  /**
   * Since we are making an API call, which is a side-effect,
   * we will wrap this in a useEffect, which will rerender the
   * view once the API request returns.
   */
  useEffect(function () {
    async function getMovies() {
      // Request the movie catalog from our resource API
      const movies = await apiRequest('movies', 'GET');
      setMovies(movies);
    }
    if (!movies.length) {
      getMovies();
    }
  });

  return (
    <Fragment>
      <h2 id="page_header" className="featured_title">
        Enjoy our selection of movies
      </h2>
      <div id="page_body">{Movies}</div>
    </Fragment>
  );
}
