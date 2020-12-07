/*
 * fecapp
 *
 * server.routes.mjs
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import request from 'superagent';

import { MOVIE_CATALOG_URL } from './server.constants.mjs';
import { auth } from './server.middleware.mjs';

/**
 * @function routes - Initializes the routes
 * @param app {Object} - Express application
 * @return {void}
 */
export default async function routes(app) {
  /**
   * Protected route for movies resource.
   * The auth middleware checks for valid user auth.
   */
  app.get('/movies', auth, async (req, res) => {
    // Calls mock, public JSON file with movie data
    const response = await request.get(MOVIE_CATALOG_URL);
    const movies = JSON.parse(response.text);
    res.json(movies);
  });
}
