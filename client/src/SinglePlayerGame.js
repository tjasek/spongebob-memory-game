import { useState } from "react";
import Card from "./Card";
import "./App.css";

const possibleCards = [
  {
    id: 1,
    image: require("./images/sponge-bob_1.jpg"),
  },
  {
    id: 2,
    image: require("./images/sponge-bob_2.jpg"),
  },
  {
    id: 3,
    image: require("./images/sponge-bob_3.jpg"),
  },
  {
    id: 4,
    image: require("./images/sponge-bob_4.jpg"),
  },
  {
    id: 5,
    image: require("./images/sponge-bob_5.jpg"),
  },
  {
    id: 6,
    image: require("./images/sponge-bob_6.jpg"),
  },
];

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function SinglePlayerGame() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [cards, setCards] = useState([]);

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
    // Set the shufeled cards
    setCards(shuffleCards.bind(null, possibleCards.concat(possibleCards)));
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
      <div className="Cards-container">
        {cards &&
          cards.map((card, index) => {
            return (
              <Card
                key={index}
                card={card}
                index={index}
                isDisabled={false}
                isInactive={false}
                isOpened={false}
                onClick={"todo"}
              />
            );
          })}
      </div>
    </div>
  );
}

export default SinglePlayerGame;
