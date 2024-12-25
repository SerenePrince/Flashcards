import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeckById, updateDeck, getDecks, logAllDecks } from "./Database.jsx";
import { FaPlusCircle, FaSave, FaMinusCircle } from "react-icons/fa";
import PropTypes from "prop-types";

function Update({ setDecks }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState([{ question: "", answer: "" }]);
  const [error, setError] = useState(""); // For error message

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deck = await getDeckById(Number(id));
        if (deck) {
          setTitle(deck.title);
          setDescription(deck.description);
          setCards(deck.cards || [{ question: "", answer: "" }]);
        } else {
          console.error(`Deck with ID ${id} not found.`);
          setError("Deck not found.");
        }
      } catch (error) {
        console.error("Error fetching deck:", error);
        setError("Failed to load deck.");
      }
    };

    fetchDeck();
  }, [id]);

  const handleAddCard = () => {
    setCards([...cards, { question: "", answer: "" }]);
  };

  const handleRemoveCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const handleSaveDeck = async () => {
    // Validate title and at least one card
    if (!title.trim()) {
      setError("Deck title is required.");
      return;
    }

    // Check if there are no cards in the deck
    if (cards.length === 0) {
      setError("A deck must have at least one card.");
      return;
    }

    // Validate that each card has both a question and an answer
    const invalidCards = cards.filter(
      (card) => !card.question.trim() || !card.answer.trim()
    );
    if (invalidCards.length > 0) {
      setError("Each card must have both a question and an answer.");
      return;
    }

    setError(""); // Clear error if validation passes

    const updatedDeck = {
      title,
      description,
      cards,
    };

    try {
      await updateDeck(Number(id), updatedDeck);
      console.log("Deck updated successfully");
      logAllDecks();

      // Update the deck list in the parent component
      const updatedDecks = await getDecks();
      setDecks(updatedDecks);

      navigate("/library");
    } catch (error) {
      console.error("Error updating deck:", error);
      setError("Failed to update deck.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-lightpurple to-lightblue">
      <div className="text-black p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Update Flashcard Deck</h1>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Deck Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-2 border rounded-lg ${
              error && !title.trim() ? "border-lightred" : ""
            }`}
            placeholder="Enter the deck title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter a description for the deck"
          ></textarea>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Flashcards</h2>
          {cards.map((card, index) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded-lg relative bg-gradient-to-r from-lightlavender to-lightpink shadow-lg"
            >
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleRemoveCard(index)}
                  className="hover:text-lightred p-1"
                >
                  <FaMinusCircle className="text-xl" />
                </button>
              </div>

              <div className="mb-2">
                <label className="block text-lg font-medium mb-2">
                  Question
                </label>
                <input
                  type="text"
                  value={card.question}
                  onChange={(e) =>
                    handleCardChange(index, "question", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter the question"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">Answer</label>
                <input
                  type="text"
                  value={card.answer}
                  onChange={(e) =>
                    handleCardChange(index, "answer", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter the answer"
                />
              </div>
            </div>
          ))}

          <button
            onClick={handleAddCard}
            className="flex items-center mt-4 py-2 px-4 bg-gradient-to-r from-lightblue to-lightgreen text-black rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <FaPlusCircle className="mr-2 text-xl" /> Add Card
          </button>
        </div>

        <div className="mt-6 flex items-center">
          <button
            onClick={handleSaveDeck}
            className="flex items-center py-2 px-4 bg-gradient-to-r from-lightblue to-lightgreen text-black rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <FaSave className="mr-2 text-xl" />
            Save Deck
          </button>

          {/* Display error message next to the save button */}
          {error && (
            <div className="ml-4 text-black font-semibold">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}

Update.propTypes = {
  setDecks: PropTypes.func.isRequired,
};

export default Update;
