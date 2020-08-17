import request from 'superagent';
import { session } from './server.auth.mjs';
import { key, cert } from './server.certs.mjs';
import { AM_URL } from './env.config.mjs';

async function auth(req, res, next) {
  let response;
    if (req.headers.authorization) {
      // Using OAuth
      const authHeaderArr = req.headers.authorization.split(' ');
      response = await request
        .post(`${AM_URL}/oauth2/introspect`)
        .key(key)
        .cert(cert)
        .set('Content-Type', 'application/json')
        .set('iPlanetDirectoryPro', session.tokenId)
        .set('Accept-API-Version', 'resource=1.2')
        .query({ token: authHeaderArr[1] });
    } else {
      // Using SSO
      response = await request
        .post(`${AM_URL}/json/sessions/?_action=validate`)
        .key(key)
        .cert(cert)
        .set('Content-Type', 'application/json')
        .set('iPlanetDirectoryPro', session.tokenId)
        .set('Accept-API-Version', 'resource=2.1, protocol=1.0')
        .send({ tokenId: req.cookies.iPlanetDirectoryPro });
    }

    if (response.body.active || response.body.valid) {
      next();
    } else {
      res.status(401).send();
    }
}

export default function (app) {
  app.get('/resource/ig/*', auth, async (req, res) => {
    req.json({ message: 'Hello, World!' });
  });
}
