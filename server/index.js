const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

// Instantiate app
const app = express();

// Setup express to fetch json as body
app.use(express.json());

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

// DB setup
const db = mysql.createConnection({
  user: "root",
  password: "root",
  host: "localhost",
  database: "spongebob-memory",
});

// api endpoints
// create user
app.post("/user/add", (req, res) => {
  const name = req.body.name;

  db.query("INSERT INTO user (name) values (?)", [name], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send({ msg: "User inserted successfully" });
    }
  });
});

// Start app on port 3001
app.listen(3001, () => {
  console.log("Yay, your server is running on port 3001");
});
