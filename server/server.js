import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('working');
});
app.listen(port, () => process.stdout.write(`Server is running on http://localhost:${port}`));
