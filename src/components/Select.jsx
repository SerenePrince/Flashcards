import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Select({ decks }) {
  const navigate = useNavigate();

  // Handle deck selection and navigate to update page
  const handleSelectDeck = (deckId) => {
    if (!deckId) return; // Guard against invalid IDs
    navigate(`/update/${deckId}`);
  };

  return (
    <div className="bg-lightpurple">
      <div className="text-black p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Select Deck to Update</h1>

        {decks.length === 0 ? (
          <p>No decks available. Please create a deck first.</p>
        ) : (
          <ul className="list-none">
            {decks.map((deck) => (
              <li
                key={deck.id}
                onClick={() => handleSelectDeck(deck.id)}
                className="mb-4 p-4 border border-gray-300 rounded-lg bg-lightlavender hover:bg-lightblue cursor-pointer"
              >
                <span>{deck.title + " : " + deck.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

Select.propTypes = {
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Select;
