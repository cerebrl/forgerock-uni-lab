/*
 * fecapp
 *
 * movie-card.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function MovieCard - Used for display a single movie and its details
 * @param {Object} props - The object representing React's props
 * @param {Object} props.movie - The movie object passed from the parent component
 * @returns {Object} - React JSX view
 */
export default function MovieCard({ movie }) {
  // CSS for the card, this could be moved to a CSS file, if desired
  const cardStyle = {
    display: 'inline-block',
    padding: '2em',
    width: '33%'
  };

  return (
    <li className="card" style={cardStyle}>
      <img
        alt={`Image from ${movie.Title}`}
        className="card-img-top"
        src={movie.Images[0]}
        style={{ width: '100%' }}
      />
      <div className="card-body">
        <h5 className="card-title"><strong>Title: {movie.Title}</strong></h5>
        <p className="card-text">Genre: {movie.Genre}</p>
        <a className="btn btn-primary">
          Watch Movie
        </a>
      </div>
    </li>
  );
}
