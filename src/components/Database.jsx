import { openDB } from "idb";

// Initialize IndexedDB
const initDB = async () => {
  try {
    const db = await openDB("FlashcardsDB", 1, {
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

// Export all decks as a JSON file
export const exportDecks = async () => {
  try {
    const db = await initDB();
    const decks = await db.getAll("decks");

    // Create a Blob from the decks array
    const blob = new Blob([JSON.stringify(decks, null, 2)], {
      type: "application/json",
    });

    // Create a link to download the file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "decks.json";

    // Trigger the download
    link.click();
  } catch (error) {
    console.error("Error exporting decks:", error);
    throw new Error("Failed to export decks to a file");
  }
};

// Import decks from a JSON file
export const importDecks = async (file) => {
  try {
    const db = await initDB();

    // Read the file content
    const fileContent = await file.text();

    // Parse the file content to JSON
    const decks = JSON.parse(fileContent);

    // Save decks to IndexedDB
    const tx = db.transaction("decks", "readwrite");
    decks.forEach((deck) => tx.store.put(deck));
    await tx.done;

    console.log("Decks imported successfully");
  } catch (error) {
    console.error("Error importing decks:", error);
    throw new Error("Failed to import decks from the file");
  }
};
