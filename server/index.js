const express = require("express");

// Instantiate app
const app = express();

// Start app on port 3001
app.listen(3001, () => {
  console.log("Yay, your server is running on port 3001");
});