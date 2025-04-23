const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const itemRoutes = require('./routes/items');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/items', itemRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on http://localhost:${process.env.PORT}`);
      console.log(`Swagger at http://localhost:${process.env.PORT}/api-docs`);
    });
  })
  .catch((err) => console.error(err));
