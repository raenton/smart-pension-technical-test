const express = require('express');
// Move this into env variable later
const PORT = 8001;
const app = express();

app.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));
