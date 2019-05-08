/* eslint-disable no-console */

const express = require('express');

const app = express();
const port = process.env.PORT || 8888;

// GET route
app.get('/backend', (req, res) => {
  res.send({
    express: 'Express Backend is Connected to React',
  });
});

// Start server and listen on port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
