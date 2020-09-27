/*
 * fecapp
 *
 * login.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FRAuth, TokenManager } from '@forgerock/javascript-sdk';
import page from 'page';
import React, { Fragment, useContext, useEffect, useState } from 'react';

import UsernamePassword from '../components/username-password.js';
import { AppContext } from '../state.js';

/**
 * @function Login - React view for managing the user authentication journey
 * @returns {Object} - React JSX view
 */
export default function Login() {
  /**
   * Compose the state used in this view.
   * First, we will use the global state methods found in the App Context
   * Then, we will create local state to manage the login journey. The
   * underscore is an unused variable, since we don't need the current state.
   */
  const [_, methods] = useContext(AppContext);
  const [step, setStep] = useState(null);

  let Step;
  let title;

  /**
   * @function submitStep - Handles the submission of the step to AM
   * @param {string} un - Username
   * @param {string} pw - Password
   * @param {Object} previousStep - Previous step in the login journey
   */
  async function submitStep(un, pw, previousStep) {
    previousStep.getCallbackOfType('NameCallback').setName(un);
    previousStep.getCallbackOfType('PasswordCallback').setPassword(pw);

    const nextStep = await FRAuth.next(previousStep);

    setStep(nextStep);
  }

  /**
   * Since we have API calls to AM, we need to handle these requests as side-effects
   * This will allow the view to render, but update/rerender after the request completes
   */
  useEffect(function () {
    /**
     * @function getInitialStep - The function to call when there's no previous step
     */
    async function getInitialStep() {
      const nextStep = await FRAuth.next();
      setStep(nextStep);
    }
    /**
     * @function completeAuth - The function to call when we get a LoginSuccess
     */
    async function completeAuth() {
      await TokenManager.getTokens({ forceRenew: true });
      methods.setAuthentication(true);
      page.redirect('/');
    }

    /**
     * Condition for handling start and stop of login journey.
     * Here's where you should add more error handling.
     */
    if (!step) {
      getInitialStep();
    } else if (step.type === 'LoginSuccess') {
      completeAuth();
    }
  });

  /**
   * Render conditions for presenting appropriate views to user.
   * Adding more steps to a journey would mean more conditions
   * to add here. More error conditions would be good here too.
   */
  if (!step) {
    title = 'Loading ... ';
    Step = function Loading() {
      return <p>Checking session ...</p>;
    };
  } else if (step.type === 'LoginSuccess') {
    title = 'Hello again!';
    Step = function Authenticated(props) {
      return (
        <div id="page_body">
          <p>Redirecting you back to our home page ... </p>
        </div>
      );
    };
  } else if (step.getStage() === 'UsernamePassword') {
    title = 'Welcome. Please enter your credentials';
    Step = UsernamePassword;
  } else {
    title = 'Oops, sorry!';
    Step = function Error() {
      return <p>It looks like there was an error.</p>;
    };
  }

  return (
    <Fragment>
      <h2 id="page_header" className="featured_title">
        {title}
      </h2>
      <Step step={step} action={submitStep} />
    </Fragment>
  );
}
