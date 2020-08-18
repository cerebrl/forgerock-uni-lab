import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'https';
import { env } from 'process';
import { key, cert } from './server.certs.mjs';
import routes from './server.routes.mjs';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      return callback(null, true);
    },
  }),
);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

routes(app);

env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
createServer({ key, cert }, app).listen(9443);

console.log(`Listening to HTTPS on secure port: 9443`);
