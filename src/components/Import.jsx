import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { importDecks, getDecks } from "./Database.jsx"; // Assuming this is the path to your database functions
import { useNavigate } from "react-router-dom"; // For navigation
import PropTypes from "prop-types";

function Import({ setDecks }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [decks, setLocalDecks] = useState([]);
  const [error, setError] = useState(""); // Error state for storing error messages
  const navigate = useNavigate(); // Hook to navigate to the library page

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/json") {
      setFile(droppedFile);
      setError(""); // Clear any previous error
      readFile(droppedFile);
    } else {
      setError("Please drop a valid JSON file.");
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/json") {
      setFile(selectedFile);
      setError(""); // Clear any previous error
      readFile(selectedFile);
    } else {
      setError("Please select a valid JSON file.");
    }
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target.result);
        // Ensure the parsed data is an array of decks
        if (Array.isArray(parsedData)) {
          setLocalDecks(parsedData);
        } else {
          setError(
            "Invalid JSON format. Please ensure it's an array of decks."
          );
        }
      } catch (error) {
        setError("Error reading the JSON file.");
        console.error("Error reading the JSON file: " + error);
      }
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (file) {
      try {
        await importDecks(file); // Save the decks to IndexedDB
        console.log("Decks imported successfully!");

        // Fetch the updated decks from the database and update the global state
        const updatedDecks = await getDecks();
        setDecks(updatedDecks); // Update the global decks state

        // Redirect to the library page
        navigate("/Flashcards/library");
      } catch (error) {
        setError("Failed to import decks.");
        console.error("Failed to import decks: " + error);
      }
    } else {
      setError("No file selected.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-lightpurple to-lightblue">
      <div className="text-black p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Import Decks</h1>

        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed p-6 mb-4 text-center rounded-lg ${
            dragging ? "bg-lightgray" : "bg-white"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-lg">
            {file ? file.name : "Drag and drop a JSON file here"}
          </p>
          <p>OR</p>
          <input
            type="file"
            accept=".json"
            className="hidden"
            id="fileInput"
            onChange={handleFileSelect}
          />
          <label
            htmlFor="fileInput"
            className="py-2 px-4 bg-gradient-to-r from-lightblue to-lightgreen text-black rounded-lg cursor-pointer mt-2 inline-block shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <div className="inline-flex align-middle">
              <FaUpload className="mr-2 text-xl" />
              Select a JSON File
            </div>
          </label>
        </div>

        {/* Displaying Decks */}
        {decks.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Imported Decks</h2>
            <ul className="space-y-4">
              {decks.map((deck) => (
                <li
                  key={deck.id}
                  className="p-4 bg-gradient-to-r from-lightpink to-lightred text-black shadow-lg rounded-lg"
                >
                  <h3 className="text-xl font-bold">{deck.title}</h3>
                  <p className="text-sm text-gray-500">{deck.description}</p>
                  <ul className="mt-2 space-y-2">
                    {deck.cards.map((card, idx) => (
                      <li key={idx}>
                        <strong>Q:</strong> {card.question}
                        <br />
                        <strong>A:</strong> {card.answer}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Import Button with Error Display */}
        <div className="mt-6 flex items-center">
          <button
            onClick={handleImport}
            className="flex items-center py-2 px-4 bg-gradient-to-r from-lightblue to-lightgreen text-black rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            <FaUpload className="mr-2 text-xl" />
            Import Decks
          </button>
          {error && (
            <div className="ml-4 text-black font-semibold">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}

Import.propTypes = {
  setDecks: PropTypes.func.isRequired,
};

export default Import;
