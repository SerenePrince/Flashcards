import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaFileExport,
  FaFileImport,
} from "react-icons/fa";

/**
 * Renders the header section for the Decks page, including action buttons for
 * creating, updating, deleting, importing, and exporting flashcard decks.
 * @returns {JSX.Element} The rendered HeaderSection component.
 */
function HeaderSection() {
  return (
    <section className="bg-gradient-to-r from-lightlavender via-lightpurple to-lightpink py-6 px-6">
      <div className="flex flex-col items-center max-w-[70%] mx-auto w-full">
        <div className="text-left w-full">
          <h1 className="text-3xl font-bold mb-4 text-black">
            My Flashcard Decks
          </h1>
          <div className="flex flex-wrap gap-4 justify-start">
            <ActionButton
              to="/Flashcards/create"
              icon={FaPlusCircle}
              text="Create Deck"
            />
            <ActionButton
              to="/Flashcards/select"
              icon={FaEdit}
              text="Update Deck"
            />
            <ActionButton
              to="/Flashcards/delete"
              icon={FaTrashAlt}
              text="Delete Deck"
            />
            <ActionButton
              to="/Flashcards/import"
              icon={FaFileImport}
              text="Import Decks"
            />
            <ActionButton
              to="/Flashcards/export"
              icon={FaFileExport}
              text="Export Decks"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Renders an individual action button used in the header section.
 * @param {Object} props - The component props.
 * @param {string} props.to - The route path for the button link.
 * @param {React.ElementType} props.icon - The icon component to display.
 * @param {string} props.text - The text to display on the button.
 * @returns {JSX.Element} The rendered ActionButton component.
 */
function ActionButton({ to, icon: Icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center py-2 px-4 bg-gradient-to-r from-lightblue to-lightgreen text-black rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
    >
      <Icon className="mr-2 text-xl" />
      {text}
    </Link>
  );
}

ActionButton.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
};

/**
 * Displays a single deck card with its title and description.
 * Allows selection through an onClick handler.
 * @param {Object} props - The component props.
 * @param {Object} props.deck - The deck data object.
 * @param {string} props.deck.title - The title of the deck.
 * @param {string} props.deck.description - A brief description of the deck.
 * @param {Function} props.onSelect - Callback when a deck is selected.
 * @returns {JSX.Element} The rendered DeckCard component.
 */
function DeckCard({ deck, onSelect }) {
  return (
    <div className="bg-gradient-to-r from-lightblue to-lightpurple shadow-lg rounded-lg p-4 hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105">
      <Link
        to={`/Flashcards/library/${deck.title}`}
        onClick={() => onSelect(deck)}
        className="block text-black"
      >
        <h3 className="text-xl font-bold">{deck.title}</h3>
        <p className="text-lg mt-2">{deck.description}</p>
      </Link>
    </div>
  );
}

DeckCard.propTypes = {
  deck: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

/**
 * Renders a list of deck cards or displays a message if no decks are available.
 * @param {Object} props - The component props.
 * @param {Array} props.decks - The array of deck objects.
 * @param {Function} props.onSelect - Callback when a deck is selected.
 * @returns {JSX.Element} The rendered DeckList component.
 */
function DeckList({ decks, onSelect }) {
  if (decks.length === 0) {
    return (
      <div className="text-lg text-black">
        No decks available. Start by creating your first deck!
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {decks.map((deck, id) => (
        <DeckCard key={id} deck={deck} onSelect={onSelect} />
      ))}
    </div>
  );
}

DeckList.propTypes = {
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

/**
 * Displays the Decks page, including the header section, loading state,
 * and a library of flashcard decks.
 * @param {Object} props - The component props.
 * @param {Array} props.decks - The array of decks to display.
 * @param {Function} props.setSelectedDeck - Callback to set the selected deck.
 * @returns {JSX.Element} The rendered Decks component.
 */
function Decks({ decks, setSelectedDeck }) {
  // If decks are still loading, show a loading spinner or message
  if (decks === undefined) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Loading your decks...</h2>
        <div className="spinner">⏳</div>{" "}
        {/* Add a spinner component or text */}
      </div>
    );
  }

  return (
    <div className="text-black">
      <HeaderSection />
      <section className="bg-gradient-to-r from-lightpink via-lightpurple to-lightlavender py-12 px-6">
        <div className="max-w-[70%] mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Your Library
          </h2>
          <DeckList decks={decks} onSelect={setSelectedDeck} />
        </div>
      </section>
    </div>
  );
}

Decks.propTypes = {
  decks: PropTypes.array.isRequired,
  setSelectedDeck: PropTypes.func.isRequired,
};

export default Decks;
