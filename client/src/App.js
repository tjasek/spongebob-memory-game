import logo from "./spongebob-logo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">SpongeBob Memory Game</h1>
        <div className="App-mode-buttons">
          <button>Single Player</button>
          <button>Multi Player</button>
        </div>
      </header>
    </div>
  );
}

export default App;
