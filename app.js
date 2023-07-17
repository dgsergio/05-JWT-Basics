const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const mainRouter = require('./routes/main');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

app.use(express.json());
app.use(express.static('./public'));
app.use('/api/v1/', mainRouter);
app.use(notFound);
app.use(errorHandler);

const start = () => {
  const port = process.env.PORT || 3000;
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
