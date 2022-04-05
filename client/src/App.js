import SinglePlayerGame from "./SinglePlayerGame";
import SinglePlayerScoreBoard from "./SinglePlayerScoreBoard";
import EntryPage from "./EntryPage";
import Route from "./Routes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route path="/">
        <EntryPage />
      </Route>
      <Route path="/single-player">
        <SinglePlayerGame />
      </Route>
      <Route path="/single-player-top-scores">
        <SinglePlayerScoreBoard />
      </Route>
    </div>
  );
}

export default App;
