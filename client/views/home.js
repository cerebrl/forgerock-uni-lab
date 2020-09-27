/*
 * fecapp
 *
 * home.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { Fragment, useContext } from 'react';

import { AppContext } from '../state.js';

/**
 * @function Home - Home React view
 * @returns {Object} - React JSX view
 */
export default function Home() {
  /**
   * Collects the global state for detecting user auth for rendering
   * appropriate navigational items.
   */
  const [state] = useContext(AppContext);
  const title = state.authenticated ? 'Hello, again!' : 'Hello, visitor!';
  const message = state.authenticated ? (
    <p>
      Welcome back! Enjoy our <a href="/catalog">new catalog of movies</a>
    </p>
  ) : (
    <p>
      <a href="/login">Sign in</a> or register to watch some amazing content!!
    </p>
  );

  return (
    <Fragment>
      <h2 id="page_header" className="featured_title">
        {title}
      </h2>
      <div id="page_body">
        { message }
      </div>
    </Fragment>
  );
}
