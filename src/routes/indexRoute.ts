import express from 'express';
import imageLoader from './api/imageLoader';

const routes = express.Router();

routes.get('/', function (req: express.Request, res: express.Response): void {
  res.send('sending main api route');
});

routes.use('/images', imageLoader);
console.log('Serving the route Images');

export default routes;
