import {initDb} from './lib/db';
import initRoutes from './routes';
import initServices from './services';
import logger from './lib/logger';
import express from 'express';
import config from './config/app.config';

async function run() {
  const db = await initDb();
  const svc = await initServices({db});

  const app = express();

  app.use(express.json());
  const routes = await initRoutes(svc);
  app.use(routes);

  const {
    app: {port},
  } = config;
  app.listen(port, () => {
    logger.info('webserver listening', {port});
  });
}

run().catch((err) => console.error('ERRR', err));
