import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Decks from "./components/Decks";
import Create from "./components/Create";
import Deck from "./components/Deck";
import Guide from "./components/Guide";
import Footer from "./components/Footer";
import { getDecks, saveDecks, logAllDecks } from "./components/Database";
import axios from "axios";

function App() {
  const [decks, setDecks] = useState([]); // Initialize as an empty array
  const [selectedDeck, setSelectedDeck] = useState(null);

  useEffect(() => {
    const initializeDecks = async () => {
      try {
        let storedDecks = await getDecks();
        if (storedDecks.length === 0) {
          // Fetch initial data if IndexedDB is empty
          const response = await axios.get("/decks.json");
          storedDecks = response.data.decks;
          await saveDecks(storedDecks);
        }
        setDecks(storedDecks);
      } catch (error) {
        console.error("Error initializing decks:", error);
      }
    };

    initializeDecks();
  }, []);

  logAllDecks();

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
            path="/library/:name"
            element={<Deck cards={selectedDeck?.cards || []} />}
          />
          <Route path="/create-deck" element={<Create />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
