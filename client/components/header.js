/*
 * fecapp
 *
 * header.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { Fragment, useContext } from 'react';

import { AppContext } from '../state.js';

/**
 * @function Header - Header React view
 * @returns {Object} - React JSX view
 */
export default function Header() {
  /**
   * Collects the global state for detecting user auth for rendering
   * appropriate navigational items.
   */
  const [state] = useContext(AppContext);
  let CatalogItem;
  let SignInOrOutItem;

  /**
   * Render different navigational items depending on authenticated status
   */
  switch (state.authenticated) {
    case true:
      CatalogItem = (
        <li>
          <a href="/catalog">Browse</a>
        </li>
      );
      SignInOrOutItem = (
        <li>
          <a href="/logout">Log out</a>
        </li>
      );
      break;
    default:
      CatalogItem = null;
      SignInOrOutItem = (
        <li>
          <a href="/login">Sign In</a>
        </li>
      );
  }

  return (
    <Fragment>
      <a className="scrollToTop" href="#">
        <i className="fa fa-angle-up"></i>
      </a>
      <header id="header">
        <nav
          className="navbar navbar-default navbar-static-top"
          role="navigation"
        >
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand">
                <img src="img/FEC_logo.png" height="50" alt="" />
              </a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul id="menu" className="nav navbar-nav custom_nav">
                <li>
                  <a href="/">Home</a>
                </li>
                { CatalogItem }
                { SignInOrOutItem }
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
}
