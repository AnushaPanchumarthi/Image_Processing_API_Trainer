//code for Main API route
import express from 'express';
import routes from './routes/indexRoute';

const app = express();
const port = 3000;

//stratin point for the route api
app.use('/api', routes);
app.get('/', (req, res) => {
  res.send('Image Processor API');
});

//start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
