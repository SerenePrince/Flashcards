import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import { getDecks, deleteDeck, logAllDecks } from "./Database"; // Assuming these are defined

function Delete({ decks, setDecks }) {
  // Delete the deck and refresh the deck list
  const handleDeleteDeck = async (deckId) => {
    try {
      // Delete the deck from the database
      await deleteDeck(deckId);

      // Refresh the list of decks from the database after deletion
      const updatedDecks = await getDecks();
      setDecks(updatedDecks); // Update the state to trigger re-render

      // Optionally, log the remaining decks
      logAllDecks();
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-lightpurple to-lightblue">
      <div className="text-black p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Delete Flashcard Decks</h1>

        {decks.length === 0 ? (
          <p>No decks available to delete.</p>
        ) : (
          <ul className="list-none">
            {decks.map((deck) => (
              <li
                key={deck.id}
                className="mb-4 p-4 border rounded-lg flex justify-between items-center bg-gradient-to-r from-lightlavender to-lightpink shadow-lg"
              >
                <span>{deck.title + ": " + deck.description}</span>
                <button
                  onClick={() => handleDeleteDeck(deck.id)}
                  className="hover:bg-lightred p-2 rounded-lg transition-all duration-200 ease-in-out"
                >
                  <FaTrash className="text-xl" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

Delete.propTypes = {
  setDecks: PropTypes.func.isRequired,
  decks: PropTypes.array.isRequired,
};

export default Delete;
