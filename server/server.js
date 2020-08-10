import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import swaggerRoute from './routes/swagger/swagger';
import db from './database/models/index';

config();
const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use('/', swaggerRoute);
app.get('/', async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.status(200).json({ message: 'welcome to morgueFile api connected to database' });
  } catch (err) {
    res.status(500).json({ message: 'unable to connect' });
  }
});
app.listen(port, () => process.stdout.write(`Server is running on http://localhost:${port}`));
export default app;
