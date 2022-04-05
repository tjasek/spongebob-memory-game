import { useState, useEffect } from "react";
import "./App.css";

function SinglePlayerScoreBoard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const getBestScores = () => {
      // save the score to db
      fetch("http://localhost:3001/user/scores/get/singlePlayer", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((response) => response.json())
        .then((data) => {
          // after it has been saved to db
          if (data.msg === "Scores fetched successfully") {
            // fill score board data
            setScores(data.scores);
            return;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      return;
    };
    // geth the top 10 scores
    getBestScores();
  }, []);

  return (
    <div>
      <h1 className="App-title">SpongeBob Memory Game</h1>
      <div className="Score-board">
        <h3>Top 10 scores:</h3>
        <ol>
          {scores &&
            scores.map((score, index) => {
              return (
                <li key={index}>
                  {score.name}: {score.score}s
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}

export default SinglePlayerScoreBoard;
