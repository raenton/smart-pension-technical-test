const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const api = require('./src/api');
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
  res.status(err.status).json({
    status: err.status || 500,
    message: err.message || 'Something went wrong.'
  });
})

app.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));
