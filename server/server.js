import express from 'express';
import morgan from 'morgan';
import swaggerRoute from './routes/swagger/swagger';

const app = express();
const port = 3000;
app.use(morgan('dev'));
app.use('/', swaggerRoute);
app.get('/', (req, res) => {
  res.send('welcome to morgueFile api');
});
app.listen(port, () => process.stdout.write(`Server is running on http://localhost:${port}`));
