import PropTypes from "prop-types";
import { useEffect } from "react";

// Reusable Section Component
const Section = ({ id, title, children }) => (
  <section id={id} className="mb-16">
    <h2 className="text-3xl font-semibold mb-6 text-black bg-gradient-to-r from-lightpurple to-lightpink px-4 py-2 rounded-md shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out">
      {title}
    </h2>
    <div className="text-lg leading-relaxed space-y-6 text-lightgray">
      {children}
    </div>
  </section>
);

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function Guide() {
  useEffect(() => {
    // Scroll to the appropriate section if a hash is present in the URL
    const handleScrollToSection = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Initial execution on mount
    handleScrollToSection();

    // Update scrolling behavior on hash change
    window.addEventListener("hashchange", handleScrollToSection);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", handleScrollToSection);
    };
  }, []);

  return (
    <div className="text-white py-12 px-8 bg-black">
      <div className="max-w-[80%] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 tracking-wide">
          Comprehensive Guide to Your Flashcard App
        </h1>

        {/* Navigation Table */}
        <table className="w-full border-collapse mb-12 shadow-lg overflow-hidden border border-lightgray">
          <thead>
            <tr className="bg-lightpink text-black">
              <th className="py-4 px-6 text-left">Section</th>
              <th className="py-4 px-6 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                href: "#create-deck",
                text: "Create Your First Deck",
                desc: "Step-by-step guide to creating and saving your first flashcard set.",
              },
              {
                href: "#update-deck",
                text: "Update a Deck",
                desc: "How to modify and improve your existing decks.",
              },
              {
                href: "#delete-deck",
                text: "Delete a Deck",
                desc: "Instructions for removing a deck from the app.",
              },
              {
                href: "#import-deck",
                text: "Import a Deck",
                desc: "Learn how to import decks using a JSON format.",
              },
              {
                href: "#export-deck",
                text: "Export a Deck",
                desc: "How to back up and share your decks.",
              },
              {
                href: "#save",
                text: "Save Decks",
                desc: "Learn about how and where your decks are stored for safety.",
              },
              {
                href: "#controls",
                text: "Controls",
                desc: "Learn about the navigation and answer-revealing controls for flashcards.",
              },
              {
                href: "#spaced",
                text: "Spaced Learning",
                desc: "What is spaced learning and what does it do?",
              },
            ].map((row, index) => (
              <tr key={index}>
                <td className="py-4 px-6">
                  <a href={row.href} className="text-white hover:underline">
                    {row.text}
                  </a>
                </td>
                <td className="py-4 px-6 text-lightgray">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Sections */}
        <Section id="create-deck" title="Create Your First Deck">
          <p>Follow these steps to create a new deck:</p>
          <ol className="list-decimal ml-8 space-y-2 text-white">
            <li>
              Go to the <strong>Library</strong> section from the main menu.
            </li>
            <li>
              Click on the <strong>Create Deck</strong> button.
            </li>
            <li>
              Fill out the <strong>title</strong> and add an optional{" "}
              <strong>description</strong>.
            </li>
            <li>Add questions and answers for your flashcards.</li>
            <li>
              Click <strong>Save Deck</strong> to finalize your deck.
            </li>
          </ol>
        </Section>

        <Section id="update-deck" title="Update a Deck">
          <p>To update an existing deck, follow these steps:</p>
          <ol className="list-decimal ml-8 space-y-2 text-white">
            <li>
              Go to the <strong>Library</strong> section from the main menu.
            </li>
            <li>
              Click the <strong>Update Deck</strong> button.
            </li>
            <li>
              Modify the <strong>title</strong>, <strong>description</strong>,
              or add/remove cards as needed.
            </li>
            <li>
              Click <strong>Save Deck</strong> to save your changes.
            </li>
          </ol>
        </Section>

        <Section id="delete-deck" title="Delete a Deck">
          <p>To delete a deck, follow these steps:</p>
          <ol className="list-decimal ml-8 space-y-2 text-white">
            <li>
              Go to the <strong>Library</strong> section from the main menu.
            </li>
            <li>
              Click the <strong>Delete Deck</strong> button.
            </li>
            <li>Select the trash icon next to the deck you want deleted.</li>
          </ol>
        </Section>

        <Section id="import-deck" title="Import a Deck">
          <p>Follow these steps to import a deck:</p>
          <ol className="list-decimal ml-8 space-y-2 text-white">
            <li>
              Go to the <strong>Library</strong> section from the main menu.
            </li>
            <li>
              Click the <strong>Import Deck</strong> button.
            </li>
            <li>Select a valid JSON file that contains your deck data.</li>
            <li>
              Click <strong>Import</strong> to upload the deck.
            </li>
            <li>Your imported deck will appear in your Library.</li>
          </ol>
          <p>Here&apos;s an example of the JSON format for importing decks:</p>
          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
            {`{
  "title": "Deck Title",
  "description": "Optional description of the deck",
  "cards": [
    {
      "question": "What is the capital of France?",
      "answer": "Paris"
    },
    {
      "question": "What is the square root of 16?",
      "answer": "4"
    }
  ]
}`}
          </pre>
        </Section>

        <Section id="export-deck" title="Export a Deck">
          <p>To export a deck, follow these steps:</p>
          <ol className="list-decimal ml-8 space-y-2 text-white">
            <li>
              Go to the <strong>Library</strong> section from the main menu.
            </li>
            <li>
              Click the <strong>Export Deck</strong> button.
            </li>
            <li>Select the decks you want exported.</li>
            <li>Your deck will be downloaded as a JSON file.</li>
          </ol>
        </Section>

        <Section id="save" title="Save Settings">
          <p>
            Your flashcards are securely stored locally in your browser. Key
            tips:
          </p>
          <ul className="list-disc ml-8 space-y-2 text-white">
            <li>
              Keep your total data size under <strong>5MB</strong> to prevent
              issues.
            </li>
            <li>Export your decks regularly to back up your progress.</li>
            <li>
              All data is stored in your browser&apos;s local storage or
              IndexedDB for fast retrieval.
            </li>
          </ul>
        </Section>

        <Section id="controls" title="Controls">
          <p>
            Navigate and interact with your flashcards using the following
            controls:
          </p>
          <ul className="list-disc ml-8 space-y-2 text-white">
            <li>
              Use the onscreen <strong>Next</strong> and{" "}
              <strong>Previous</strong> buttons to move between flashcards.
            </li>
            <li>
              Hover over a flashcard to reveal the <strong>answer</strong>.
            </li>
            <li>
              Use the <strong>left and right arrow keys</strong> to navigate
              through the cards.
            </li>
            <li>
              Hold down the <strong>spacebar</strong> to instantly reveal the
              answer.
            </li>
          </ul>
        </Section>

        <Section id="spaced" title="The Power of Spaced Learning">
          <p>
            Spaced learning is a powerful technique that leverages the natural
            process of memory retention. Unlike cramming, spaced learning
            involves reviewing material over increasing intervals, which helps
            reinforce information in your long-term memory. By revisiting
            content multiple times, you strengthen neural connections, making it
            easier to recall when needed. This method optimizes study time,
            reduces cognitive fatigue, and ensures that what you learn sticks.
            Whether you&apos;re preparing for an exam or mastering a new
            subject, incorporating spaced learning into your routine can
            dramatically improve your ability to retain and apply knowledge over
            time.
          </p>
        </Section>
      </div>
    </div>
  );
}

export default Guide;
