const express = require("express");
const cors = require("cors");

// Instantiate app
const app = express();

// CORS setup
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Start app on port 3001
app.listen(3001, () => {
  console.log("Yay, your server is running on port 3001");
});
