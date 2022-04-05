const connection = require("./connection");

createUser = (name) => {
  const sql = "INSERT INTO user (name) values (?)";
  return new Promise((resolve, reject) => {
    connection.query(sql, [name], (error, result) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(result.insertId);
      }
    });
  });
};

getUserIdFromName = (name) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT id FROM user WHERE name=? LIMIT 1",
      [name],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result[0].id);
      }
    );
  });
};

setScore = (gameMode, score) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO score (gameMode, score) values (?,?)",
      [gameMode, score],
      (error, result) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(result.insertId);
        }
      }
    );
  });
};

insertUserScoreRelation = (userId, scoreId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO user_score (userId, scoreId) values (?,?)",
      [userId, scoreId],
      (error, result) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(result.insertId);
        }
      }
    );
  });
};

getSinglePlayerBest10Scores = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT s.score, u.name FROM score s, user u, user_score us WHERE us.scoreId = s.id and us.userId = u.id and s.gameMode = 'singlePlayer' ORDER BY s.score asc LIMIT 10;",
      (error, result) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

exports.createUser = createUser;
exports.getUserIdFromName = getUserIdFromName;
exports.setScore = setScore;
exports.insertUserScoreRelation = insertUserScoreRelation;
exports.getSinglePlayerBest10Scores = getSinglePlayerBest10Scores;
