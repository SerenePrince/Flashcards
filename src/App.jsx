import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Decks from "./components/Decks";
import Create from "./components/Create";
import Deck from "./components/Deck";
import Guide from "./components/Guide";
import Footer from "./components/Footer";
import { getDecks, saveDecks } from "./components/Database";
import axios from "axios";
import Delete from "./components/Delete";
import Update from "./components/Update";
import Select from "./components/Select";

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
          const response = await axios.get("/decks.json");

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
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/library"
            element={<Decks decks={decks} setSelectedDeck={setSelectedDeck} />}
          />
          <Route
            path="/library/:title"
            element={<Deck cards={selectedDeck?.cards || []} />}
          />
          <Route path="/create" element={<Create setDecks={setDecks} />} />
          <Route path="/select" element={<Select decks={decks} />} />
          <Route path="/update/:id" element={<Update setDecks={setDecks} />} />
          <Route
            path="/delete"
            element={<Delete setDecks={setDecks} decks={decks} />}
          />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
