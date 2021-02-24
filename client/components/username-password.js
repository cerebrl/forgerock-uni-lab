/*
 * fecapp
 *
 * username-password.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function UsernamePassword - React component used for displaying username and password step
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.step - The authentication "step" object from ForgeRock's SDK
 * @returns {Object} - React JSX view
 */
export default function UsernamePassword(props) {
  /**
   * @function submitForm - Handles the submission of the form
   * @param {Object} event - Synthetic event object from the DOM event
   */
  function submitForm(event) {
    // Prevent a traditional form submission
    event.preventDefault();
    const un = event.target.elements.username.value;
    const pw = event.target.elements.password.value

    // Call the parent function with the captured data
    props.action(un, pw, props.step);
  }

  const usernameLabel = props.step.getCallbackOfType('NameCallback').getPrompt();
  const passwordLabel = props.step.getCallbackOfType('PasswordCallback').getPrompt();

  return (
    <div id="page_body">
      <form onSubmit={ submitForm }>
        <div className="form-group">
          <label htmlFor="usernameInput">{ usernameLabel }</label>
          <input
            type="username"
            name="username"
            className="form-control"
            id="usernameInput"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">{ passwordLabel }</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="passwordInput"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
