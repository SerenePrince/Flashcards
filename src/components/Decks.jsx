import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaFileExport,
  FaFileImport,
} from "react-icons/fa";

function HeaderSection() {
  return (
    <section className="bg-lightlavender py-6 px-6 flex items-center">
      <div className="inline-flex flex-row justify-between items-center max-w-[70%] mx-auto w-full">
        <div className="flex-col text-left">
          <h1 className="text-3xl font-bold mb-4 inline-block">
            My Flashcard Decks
          </h1>
          <div className="inline-flex space-x-4">
            <ActionButton to="/create" icon={FaPlusCircle} text="Create Deck" />
            <ActionButton to="/update" icon={FaEdit} text="Update Deck" />
            <ActionButton to="/delete" icon={FaTrashAlt} text="Delete Deck" />
            <ActionButton
              to="/import"
              icon={FaFileImport}
              text="Import Decks"
            />
            <ActionButton
              to="/export"
              icon={FaFileExport}
              text="Export Decks"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

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

function DeckCard({ deck, onSelect }) {
  return (
    <div className="bg-gradient-to-r from-lightblue to-lightpurple shadow-lg rounded-lg p-4 hover:shadow-xl transition-all duration-200">
      <Link
        to={`/library/${deck.name}`}
        onClick={() => onSelect(deck)}
        className="block text-black hover:text-darkblue"
      >
        <h3 className="text-xl font-bold">{deck.name}</h3>
        <p className="text-lg mt-2">{deck.description}</p>
      </Link>
    </div>
  );
}

DeckCard.propTypes = {
  deck: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

function DeckList({ decks, onSelect }) {
  return decks.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {decks.map((deck, id) => (
        <DeckCard key={id} deck={deck} onSelect={onSelect} />
      ))}
    </div>
  ) : (
    <p>No decks available. Start by creating your first deck!</p>
  );
}

DeckList.propTypes = {
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

function Decks({ decks, setSelectedDeck }) {
  return (
    <div className="text-black">
      <HeaderSection />
      <section className="bg-lightpink py-12 px-6">
        <div className="max-w-[70%] mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Your Library</h2>
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
