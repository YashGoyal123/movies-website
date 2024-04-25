// conn.js
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Aniwatch")
  .then(() => {
    console.log('Connection successful');
    const db = mongoose.connection;
  })
  .catch((error) => {
    console.error('Connection failed:', error.message);
  });

 module.exports = mongoose.connection;
