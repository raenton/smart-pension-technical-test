const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const api = require('./src/api');
const errors = require('./src/errors');
// Move this into env variable later
const PORT = 8001;
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: {
    fileSize: 1024 * 1024 // 1 MB
  },
  abortOnLimit: true
}));

app.use('/api', api);

// basic error handling
app.use(function (err, req, res, next) {
  let status = 500;
  // Can add many cases here to get the right status for custom errors.
  // The reason for doing this here is so that the errors thrown by services (weblogService etc)
  // can remain semi-ignorant of HTTP concerns.
  switch(typeof err) {
    case errors.UserInputError:
      status = 400;
    break;
  }
  
  res.status(status).json({
    status: status,
    message: err.message || 'Something went wrong.'
  });
});

app.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));
