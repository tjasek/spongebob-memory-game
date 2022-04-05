import { useState, useRef, useEffect } from "react";
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
  const [openCards, setOpenedCards] = useState([]);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [foundCouples, setFoundCouples] = useState([]);
  const [gameRunning, setGameRunning] = useState(false);
  const [playingTime, setPlayingTime] = useState(0);
  const [victoryMsg, setVictoryMsg] = useState("");
  const [nameInputDisabled, setNameInputDisabled] = useState(false);
  const [okButtonDisabled, setOkButtonDisabled] = useState(false);
  const [playButtonDisabled, setPlayButtonDisabled] = useState(true);

  let timeout = useRef(null);

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
      .then((data) => {
        // after it has been saved to db
        if (data.msg === "User inserted successfully") {
          // make the input and OK button inactive
          setNameInputDisabled(true);
          setOkButtonDisabled(true);
          // make the start button active
          setPlayButtonDisabled(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const playGame = () => {
    // set game started
    setGameRunning(true);
    // Set the shufeled cards
    setCards(shuffleCards.bind(null, possibleCards.concat(possibleCards)));
    // enable cards
    enable();
  };

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const isCardOpened = (id) => {
    return openCards.includes(id);
  };

  const isCardInactive = (card) => {
    return Boolean(foundCouples[card.id]);
  };

  const cardClicked = (index) => {
    if (openCards.length === 1) {
      setOpenedCards((prev) => [...prev, index]);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenedCards([index]);
    }
  };

  const [first, second] = openCards;
  // if both currently opened cards are the same, then add them to foundCouples array
  const isPairFound = () => {
    if (cards[first] === cards[second]) {
      return true;
    } else {
      return false;
    }
  };

  const evaluate = () => {
    enable();
    const pairFound = isPairFound();
    if (pairFound) {
      // add to the found couples array
      setFoundCouples((prev) => ({ ...prev, [cards[first].id]: true }));
      // clear the opened array
      setOpenedCards([]);
      return;
    }
  };

  // when there are 2 opened cards evaluate if they are a pair
  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 500);
      return () => {
        clearTimeout(timeout);
      };
    }
  });

  // when found couples array changes check if the array is the same as initial array
  useEffect(() => {
    const checkCompletion = () => {
      if (Object.keys(foundCouples).length === possibleCards.length) {
        setVictoryMsg("YOU WIN!");
        setGameRunning(false);
      }
    };
    checkCompletion();
  }, [foundCouples]);

  useEffect(() => {
    // start counting time
    if (gameRunning) {
      setTimeout(() => {
        setPlayingTime(playingTime + 1);
      }, 1000);
    }
  }, [playingTime, gameRunning]);

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
            disabled={nameInputDisabled}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <button
            className="Create-player"
            onClick={createPlayer}
            disabled={okButtonDisabled}
          >
            OK
          </button>
        </div>
        <div className="Break-row"></div>
        <button
          className="Play-game"
          onClick={playGame}
          disabled={playButtonDisabled}
        >
          Play
        </button>
      </div>
      <p>Game Time: {playingTime}</p>
      {victoryMsg !== "" ? (
        <h3>{victoryMsg}</h3>
      ) : (
        <div className="Cards-container">
          {cards &&
            cards.map((card, index) => {
              return (
                <Card
                  key={index}
                  card={card}
                  index={index}
                  isDisabled={shouldDisableAllCards}
                  isInactive={isCardInactive(card)}
                  isOpened={isCardOpened(index)}
                  onClick={cardClicked}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default SinglePlayerGame;
