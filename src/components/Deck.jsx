import PropTypes from "prop-types";
import Flashcard from "./Flashcard.jsx";
import { useState, useEffect, useCallback } from "react";

function Deck({ cards }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const changeCard = useCallback(
    (direction) => {
      setCurrentCardIndex((prevIndex) => {
        const nextIndex = direction === "next" ? prevIndex + 1 : prevIndex - 1;
        return Math.max(0, Math.min(nextIndex, cards.length - 1));
      });
    },
    [cards.length]
  );

  useEffect(() => {
    const handleKeydown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          changeCard("prev");
          break;
        case "ArrowRight":
          changeCard("next");
          break;
        case " ":
          event.preventDefault();
          setIsCardFlipped((prevState) => !prevState);
          break;
        default:
          break;
      }
    };

    const handleKeyup = (event) => {
      if (event.key === " ") {
        setIsCardFlipped(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [changeCard]);

  if (!cards || cards.length === 0) {
    return (
      <p className="text-center text-lg text-lightgray">No cards available.</p>
    );
  }

  const buttonClass =
    "rounded bg-lightpurple px-4 py-2 disabled:bg-lightgray disabled:cursor-not-allowed bg-gradient-to-r from-lightblue to-lightpurple text-black";

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row p-5">
        <Flashcard
          question={cards[currentCardIndex].question}
          answer={cards[currentCardIndex].answer}
          isFlipped={isCardFlipped}
          gradient="from-lightlavender to-lightpink"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => changeCard("prev")}
          disabled={currentCardIndex === 0}
          className={buttonClass}
        >
          Previous
        </button>
        <button
          onClick={() => changeCard("next")}
          disabled={currentCardIndex === cards.length - 1}
          className={buttonClass}
        >
          Next
        </button>
      </div>
      <p className="mt-2 text-white">
        Card {currentCardIndex + 1} of {cards.length}
      </p>
    </div>
  );
}

Deck.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Deck;
