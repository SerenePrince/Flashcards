import { openDB } from "idb";

// Initialize IndexedDB
const initDB = async () => {
  try {
    const db = await openDB("FlashcardAppDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("decks")) {
          db.createObjectStore("decks", { keyPath: "id", autoIncrement: true });
        }
      },
    });
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw new Error("Failed to initialize the database");
  }
};

// Get all decks from the database
export const getDecks = async () => {
  try {
    const db = await initDB();
    return await db.getAll("decks");
  } catch (error) {
    console.error("Error getting decks:", error);
    throw new Error("Failed to fetch decks from the database");
  }
};

// Get a deck by ID
export const getDeckById = async (deckId) => {
  try {
    const db = await initDB();
    return await db.get("decks", deckId);
  } catch (error) {
    console.error(`Error getting deck with ID ${deckId}:`, error);
    throw new Error(`Failed to fetch deck with ID ${deckId}`);
  }
};

// Save decks to the database
export const saveDecks = async (decks) => {
  try {
    const db = await initDB();
    const tx = db.transaction("decks", "readwrite");
    decks.forEach((deck) => tx.store.put(deck));
    await tx.done;
  } catch (error) {
    console.error("Error saving decks:", error);
    throw new Error("Failed to save decks to the database");
  }
};

// Update a deck by ID
export const updateDeck = async (deckId, updatedDeck) => {
  try {
    const db = await initDB();
    const tx = db.transaction("decks", "readwrite");
    await tx.store.put({ ...updatedDeck, id: deckId });
    await tx.done;
    console.log(`Deck with ID ${deckId} updated successfully`);
  } catch (error) {
    console.error(`Error updating deck with ID ${deckId}:`, error);
    throw new Error(`Failed to update deck with ID ${deckId}`);
  }
};

// Log all decks (for debugging purposes)
export const logAllDecks = async () => {
  try {
    const db = await initDB();
    const decks = await db.getAll("decks");
    console.log("Current decks in IndexedDB:", decks);
    return decks;
  } catch (error) {
    console.error("Error logging decks:", error);
    throw new Error("Failed to log decks from the database");
  }
};

// Delete a deck by ID
export const deleteDeck = async (deckId) => {
  try {
    const db = await initDB();
    const tx = db.transaction("decks", "readwrite");
    await tx.store.delete(deckId);
    await tx.done;
    console.log(`Deck with ID ${deckId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting deck with ID ${deckId}:`, error);
    throw new Error(`Failed to delete deck with ID ${deckId}`);
  }
};
