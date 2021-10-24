const express = require('express');
const cors = require('cors');
const api = require('./src/api');
// Move this into env variable later
const PORT = 8001;
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use('/api', api);

app.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));
