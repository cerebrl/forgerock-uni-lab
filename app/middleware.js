import { sessionUrl } from './constants.js';
import state from './state.js';

export async function auth(ctx, next) {
  const response = await fetch(`${sessionUrl}?_action=validate`, {
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      'accept-api-version': 'protocol=1.0,resource=2.0',
      'x-requested-with': 'forgerock-sdk',
    },
    method: 'POST',
  });

  const json = await response.json();

  if (json.valid) {
    state.authenticated = true;
    next();
  } else {
    state.authenticated = false;
    ctx.page.redirect('/login');
  }
}
