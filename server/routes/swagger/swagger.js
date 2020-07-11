import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const router = express.Router();

const swaggerDefinition = {
  info: {
    title: 'morgue file documentation',
    version: '1.0.0',
  },
  host: process.env.BASE_URL,
};
const options = {
  swaggerDefinition,
  apis: ['./server/routes/swagger/*.swagger.js'],
};
const swaggerSpec = swaggerJsdoc(options);
router.get('/swagger', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
router.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default router;
