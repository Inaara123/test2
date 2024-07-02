const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/Database');
const couponRoutes = require('./routes/coupons');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3002', // your frontend origin
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use('/api', couponRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
