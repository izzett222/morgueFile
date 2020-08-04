import express from 'express';
import morgan from 'morgan';
import swaggerRoute from './routes/swagger/swagger';
import db from './database/models/index';

const app = express();
const port = 3000;
app.use(morgan('dev'));
app.use('/', swaggerRoute);
app.get('/', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.send('welcome to morgueFile api connected to database');
  } catch (err) {
    res.send('unable to connect');
  }
});
app.listen(port, () => process.stdout.write(`Server is running on http://localhost:${port}`));
