import { useState } from "react";
import "./App.css";

function SinglePlayerGame() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const createPlayer = () => {
    // check if name not null, throw error if it is
    if (name === "") {
      setError("Please enter a name");
      return false;
    }
    // save the player to db with fetch
    fetch("http://localhost:3001/user/add", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const playGame = () => {
    console.log("todo");
  };

  return (
    <div>
      <h1 className="App-title">SpongeBob Memory Game</h1>
      {error && <p className="Error">{error}</p>}
      <div className="Single-player-setup">
        <div className="Form-row">
          <input
            type="text"
            name="Player-name"
            id="Player-name"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <button className="Create-player" onClick={createPlayer}>
            OK
          </button>
        </div>
        <div className="Break-row"></div>
        <button className="Play-game" onClick={playGame}>
          Play
        </button>
      </div>
    </div>
  );
}

export default SinglePlayerGame;
