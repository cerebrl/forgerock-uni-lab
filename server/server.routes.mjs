import request from 'superagent';
import { key, cert } from './server.certs.mjs';
import { AM_URL } from './server.constants.mjs';

async function auth(req, res, next) {
  let response;
  try {
    if (req.headers.authorization) {
      // Using OAuth
      const authHeaderArr = req.headers.authorization.split(' ');
      response = await request
        .post(`${AM_URL}/oauth2/introspect`)
        .key(key)
        .cert(cert)
        .set('Content-Type', 'application/json')
        .set('iPlanetDirectoryPro', req.cookies.iPlanetDirectoryPro)
        .set('Accept-API-Version', 'resource=1.2')
        .query({ token: authHeaderArr[1] });
    } else {
      // Using SSO
      response = await request
        .post(`${AM_URL}/json/sessions/?_action=validate`)
        .key(key)
        .cert(cert)
        .set('Content-Type', 'application/json')
        .set('iPlanetDirectoryPro', req.cookies.iPlanetDirectoryPro)
        .set('Accept-API-Version', 'resource=2.1, protocol=1.0')
        .send({ tokenId: req.cookies.iPlanetDirectoryPro });
    }
  } catch (err) {
    response = {
      body: {},
    };
  }

  if (response.body.active || response.body.valid) {
    next();
  } else {
    res.status(401).send();
  }
}

export default function (app) {
  app.get('/movies', auth, async (req, res) => {
    res.json({ message: 'Movies!!' });
  });
}
