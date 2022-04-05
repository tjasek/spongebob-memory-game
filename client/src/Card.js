import React from "react";
import spongebob from "./images/sponge-bob-back.jpg";
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
        <img src={spongebob} alt="spongebob" />
      </div>
      <div className="Card-front">
        <img src={card.image} alt="spongebob" />
      </div>
    </div>
  );
};

export default Card;
