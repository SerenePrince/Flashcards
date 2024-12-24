import { openDB } from "idb";

export const initDB = async () => {
  const db = await openDB("FlashcardAppDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("decks")) {
        db.createObjectStore("decks", { keyPath: "id", autoIncrement: true });
      }
    },
  });
  return db;
};

export const getDecks = async () => {
  const db = await initDB();
  return db.getAll("decks");
};

export const saveDecks = async (decks) => {
  const db = await initDB();
  const tx = db.transaction("decks", "readwrite");
  for (const deck of decks) {
    await tx.store.put(deck);
  }
  await tx.done;
};

export const logAllDecks = async () => {
  const db = await initDB();
  const decks = await db.getAll("decks");
  console.log("Current decks in IndexedDB:", decks);
  return decks;
};
