/*
 * fecapp
 *
 * password.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function Password - React component used for displaying password callback
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.step - The authentication "step" object from ForgeRock's SDK
 * @returns {Object} - React JSX view
 */
export default function Password(props) {
  const passwordCb= props.step.getCallbackOfType('PasswordCallback');
  const passwordLabel = passwordCb.getPrompt();

  /**
   * @function setValue - Sets the value on the callback on element blur (lose focus)
   * @param {Object} event
   */
  function setValue(event) {
    passwordCb.setPassword(event.target.value);
  }

  return (
    <div className="form-group">
      <label htmlFor="passwordInput">{ passwordLabel }</label>
      <input
        onBlur={ setValue }
        type="password"
        name="password"
        className="form-control"
        id="passwordInput"
      />
    </div>
  );
}
