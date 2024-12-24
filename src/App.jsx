import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Decks from "./components/Decks";
import Create from "./components/Create";
import { useEffect, useState } from "react";
import axios from "axios";
import Deck from "./components/Deck";
import Guide from "./components/Guide";
import Footer from "./components/Footer";

function App() {
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get("/decks.json");
        setDecks(response.data.decks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
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
