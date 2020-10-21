import express from 'express';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import { config } from 'dotenv';
import swaggerRoute from './routes/swagger/swagger';
import userRoute from './routes/user';

config();
const app = express();
const port = process.env.PORT || 3000;
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/', swaggerRoute);
app.use('/api/v1/user', userRoute);
app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to chat-app api' });
});
app.listen(port, () => process.stdout.write(`Server is running on http://localhost:${port}`));
export default app;
