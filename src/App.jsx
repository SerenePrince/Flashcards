import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Decks from "./components/Decks.jsx";
import Create from "./components/Create.jsx";
import Deck from "./components/Deck.jsx";
import Guide from "./components/Guide.jsx";
import Footer from "./components/Footer.jsx";
import { getDecks, saveDecks } from "./components/Database.jsx";
import axios from "axios";
import Delete from "./components/Delete.jsx";
import Update from "./components/Update.jsx";
import Select from "./components/Select.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Export from "./components/Export.jsx";
import Import from "./components/Import.jsx";

function App() {
  const [decks, setDecks] = useState([]); // Initialize as an empty array
  const [selectedDeck, setSelectedDeck] = useState(null);

  useEffect(() => {
    const initializeDecks = async () => {
      try {
        let storedDecks = await getDecks();

        // Ensure storedDecks is an array before proceeding
        if (!Array.isArray(storedDecks)) {
          storedDecks = [];
        }

        if (storedDecks.length === 0) {
          // Fetch initial data if IndexedDB is empty
          const response = await axios.get("/template.json");

          // Ensure the fetched data has a decks array
          if (response.data && Array.isArray(response.data.decks)) {
            storedDecks = response.data.decks;
            await saveDecks(storedDecks); // Save the fetched data
          } else {
            console.error("Invalid data format from /decks.json");
            storedDecks = [];
          }
        }

        setDecks(storedDecks);
      } catch (error) {
        console.error("Error initializing decks:", error);
        // Handle error by setting an empty array to avoid undefined state
        setDecks([]);
      }
    };

    initializeDecks();
  }, []);

  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/Flashcards" element={<Home />} />
        <Route
          path="/Flashcards/library"
          element={<Decks decks={decks} setSelectedDeck={setSelectedDeck} />}
        />
        <Route
          path="/Flashcards/library/:title"
          element={<Deck cards={selectedDeck?.cards || []} />}
        />
        <Route
          path="/Flashcards/create"
          element={<Create setDecks={setDecks} />}
        />
        <Route path="/Flashcards/select" element={<Select decks={decks} />} />
        <Route
          path="/Flashcards/update/:id"
          element={<Update setDecks={setDecks} />}
        />
        <Route
          path="/Flashcards/delete"
          element={<Delete setDecks={setDecks} decks={decks} />}
        />
        <Route path="/Flashcards/export" element={<Export />} />
        <Route
          path="/Flashcards/import"
          element={<Import setDecks={setDecks} />}
        />
        <Route path="/Flashcards/guide" element={<Guide />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
