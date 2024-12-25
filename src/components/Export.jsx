import { useState, useEffect } from "react";
import { getDecks } from "./Database";
import { FaDownload } from "react-icons/fa";

function Export() {
  const [decks, setDecks] = useState([]);
  const [selectedDecks, setSelectedDecks] = useState([]);
  const [error, setError] = useState(""); // For error message

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const allDecks = await getDecks();
        if (allDecks.length === 0) {
          setError("No decks available to export.");
        } else {
          setDecks(allDecks);
          setError(""); // Clear error if decks are found
        }
      } catch (error) {
        console.error("Error fetching decks:", error);
        setError("Failed to load decks.");
      }
    };

    fetchDecks();
  }, []);

  const handleDeckSelection = (deckId) => {
    setSelectedDecks((prev) =>
      prev.includes(deckId)
        ? prev.filter((id) => id !== deckId)
        : [...prev, deckId]
    );
  };

  const handleExport = () => {
    const selectedDecksData = decks.filter((deck) =>
      selectedDecks.includes(deck.id)
    );

    if (selectedDecksData.length === 0) {
      setError("No decks selected for export.");
      return;
    }

    // Format the decks as JSON
    const content = JSON.stringify(selectedDecksData, null, 2); // Pretty-print JSON

    const blob = new Blob([content], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "decks.json";
    link.click();
    setError("Decks exported successfully.");
  };

  return (
    <div className="bg-gradient-to-r from-lightpurple to-lightblue">
      <div className="text-black p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Export Decks</h1>
        {decks.length > 0 ? (
          <>
            <div className="mb-4">
              <div className="space-y-4">
                {decks.map((deck) => (
                  <div
                    key={deck.id}
                    className="mb-4 p-4 border rounded-lg flex items-center bg-gradient-to-r from-lightlavender to-lightpink shadow-lg"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDecks.includes(deck.id)}
                      onChange={() => handleDeckSelection(deck.id)}
                      className="mr-2"
                    />
                    <label className="text-lg">
                      {deck.title + ": " + deck.description}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <button
                onClick={handleExport}
                className="flex items-center py-2 px-4 bg-gradient-to-r from-lightblue to-lightgreen text-black rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                <FaDownload className="mr-2 text-xl" />
                Export Deck
              </button>
              {error && (
                <div className="ml-4 text-black font-semibold">{error}</div>
              )}
            </div>
          </>
        ) : (
          <div className="text-black">{error}</div>
        )}
      </div>
    </div>
  );
}

export default Export;
