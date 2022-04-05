import { useState } from "react";
import SinglePlayerGame from "./SinglePlayerGame";
import "./App.css";
import logo from "./spongebob-logo.png";

function App() {
  const [mode, setMode] = useState("");

  const selectedSinglePlayerMode = () => {
    setMode("singlePlayer");
  };

  const selectedMultiPlayerMode = () => {
    setMode("multiPlayer");
  };

  return (
    <div className="App">
      {mode === "" && (
        <>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">SpongeBob Memory Game</h1>
          <div className="App-mode-buttons">
            <button onClick={selectedSinglePlayerMode}>Single Player</button>
            <button onClick={selectedMultiPlayerMode}>Multi Player</button>
          </div>
        </>
      )}
      {mode === "singlePlayer" && <SinglePlayerGame />}
    </div>
  );
}

export default App;
