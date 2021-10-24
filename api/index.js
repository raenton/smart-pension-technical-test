const express = require('express');
const api = require('./src/api');
// Move this into env variable later
const PORT = 8001;
const app = express();

app.use('/api', api);

app.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));
