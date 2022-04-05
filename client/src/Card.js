import React from "react";
import "./Card.css";

const Card = ({ onClick, card, index, isOpened, isInactive, isDisabled }) => {
  const handleClick = () => {
    !isOpened && !isDisabled && onClick(index);
  };

  return (
    <div
      className={`Card ${isOpened ? "Opened" : ""} ${isInactive ? "Inactive" : ""}`}
      onClick={handleClick}
    >
      <div className="Card-back">
        <h1 className="App-title">SB</h1>
      </div>
      <div className="Card-front">
        <img src={card.image} alt="spongebob" />
      </div>
    </div>
  );
};

export default Card;
