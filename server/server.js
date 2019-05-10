/* eslint-disable no-console */

const express = require('express');

const auth = require('./auth/app');

const app = express();
const port = process.env.PORT || 3001;

console.log(auth);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// GET route
app.get('/api/recents', (req, res) => {
  res.send({
    yeet: 'This is the data',
  });
  console.log('Responded to frontend from Express');
  /*
  res.send({
    express: 'Express Backend is Connected to React',
  }); */
});

// Start server and listen on port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
