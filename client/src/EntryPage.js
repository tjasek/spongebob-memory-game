import Link from "./Link";
import logo from "./images/spongebob-logo.png";

const EntryPage = () => {
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">SpongeBob Memory Game</h1>
      <div className="App-mode-buttons">
        <Link href="/single-player" className="Link-buttons">Single Player</Link>
        <Link href="/multi-player" className="Link-buttons">Multi Player</Link>
      </div>
    </div>
  );
};

export default EntryPage;
