//code for Main API route
import express from 'express';
import routes from './routes/indexRoute';

const app = express();
const port = 3000 as number;

//Initial point for the route api
app.use('/api', routes);
app.get('/', function (req: express.Request, res: express.Response): void {
  res.send('Image Processor API');
});

//start the express server
app.listen(port, function (): void {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
