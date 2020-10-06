/*
 * fecapp
 *
 * index.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Config } from '@forgerock/javascript-sdk';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js';
import { AM_URL, REALM_PATH } from './constants.js';
import { AppContext, useStateMgmt } from './state.js';

console.log('Set AM configuration');

/**
 * Configure JS SDK for AM installation
 */
Config.set({
  clientId: 'SDKOAuthClient',
  redirectUri: 'https://sdkapp.example.com:8443/_callback',
  scope: 'openid profile email',
  serverConfig: {
    baseUrl: AM_URL,
    timeout: '30000',
  },
  realmPath: REALM_PATH,
  tree: 'Test',
});

// It's worth noting that all values are strings in session or localStorage.
const authenticatedString = window.sessionStorage.getItem('sdk_authenticated');
const currentPage = new URL(window.location.href).pathname.slice(1);

/**
 * @function Init - Initializes React and global state
 * @returns {Object} - React JSX view
 */
function Init() {
  /**
   * This initializes the global state with React's Context API
   * This can be useful to "hydrate" the state with stored data,
   * like this authentication status stored in sessionStorage.
   */
  const stateMgmt = useStateMgmt(authenticatedString === 'true', currentPage);

  return (
    <AppContext.Provider value={stateMgmt}>
      <App />
    </AppContext.Provider>
  );
}

ReactDOM.render(<Init />, document.getElementById('root'));
