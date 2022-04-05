const express = require("express");
const cors = require("cors");
const db = require("./dbutils");

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

// api endpoints
// create user
app.post("/user/add", async (req, res) => {
  const name = req.body.name;
  try {
    const userId = await db.createUser(name);
    res.send({ msg: "User inserted successfully", userId: userId });
  } catch (e) {
    console.log(e);
  }
});

// save score and return top 10 scores
app.post("/user/score/add", async (req, res) => {
  const name = req.body.name;
  const score = req.body.score;
  const gameMode = req.body.gameMode;

  try {
    const userId = await db.getUserIdFromName(name);
    const setScoreAndGetId = await db.setScore(gameMode, score);
    const userScoreId = await db.insertUserScoreRelation(
      userId,
      setScoreAndGetId
    );
    if (userScoreId > 0) {
      // just store the score, no need to show it on the same page
      res.send({ msg: "Score inserted successfully" });
    }
  } catch (e) {
    console.log(e);
  }
});

// get the top 10 scores board based on the playing mode
app.get("/user/scores/get/:gameMode", async (req, res) => {
  const gameMode = req.params.gameMode;
  try {
    const scores = await db.get10BestScores(gameMode);
    res.send({ msg: "Scores fetched successfully", scores: scores });
  } catch (e) {
    console.log(e);
  }
});

// Start app on port 3001
app.listen(3001, () => {
  console.log("Yay, your server is running on port 3001");
});
