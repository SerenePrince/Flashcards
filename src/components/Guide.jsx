import PropTypes from "prop-types";
import { useEffect } from "react";

// Reusable Section Component
const Section = ({ id, title, children }) => (
  <section id={id} className="mb-16">
    <h2 className="text-3xl font-semibold mb-6 text-black bg-lightpink px-4 py-2 rounded-md">
      {title}
    </h2>
    <div className="text-lg leading-relaxed space-y-6 text-gray-300">
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
        <h1 className="text-4xl font-bold text-center mb-12 text-blue-400">
          Comprehensive Guide to Your Flashcard App
        </h1>

        {/* Navigation Table */}
        <table className="w-full border-collapse mb-12 shadow-lg bg-gray-900 rounded-lg overflow-hidden border border-gray-600">
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
                href: "#library",
                text: "Library",
                desc: "Manage your decks: create, import, export, or update them.",
              },
              {
                href: "#save",
                text: "Save",
                desc: "Learn about how and where your decks are stored for safety.",
              },
              {
                href: "#controls",
                text: "Controls",
                desc: "Explore key controls and shortcuts for better navigation.",
              },
              {
                href: "#spaced-repetition",
                text: "Spaced Repetition",
                desc: "Understand the science behind this powerful learning technique.",
              },
            ].map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition-colors`}
              >
                <td className="py-4 px-6">
                  <a href={row.href} className="text-blue-400 hover:underline">
                    {row.text}
                  </a>
                </td>
                <td className="py-4 px-6 text-gray-300">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Sections */}
        <Section id="create-deck" title="Create Your First Deck">
          <p>Follow these steps to create a new deck:</p>
          <ol className="list-decimal ml-8 space-y-2">
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

        <Section id="library" title="Library">
          <p>
            The <strong>Library</strong> is your centralized hub for deck
            management:
          </p>
          <ul className="list-disc ml-8 space-y-2">
            <li>Create new decks for your study sessions.</li>
            <li>Delete or update existing decks as needed.</li>
            <li>Import decks using the provided JSON template format.</li>
            <li>Export your decks to share or back up your progress.</li>
          </ul>
        </Section>

        <Section id="save" title="Save">
          <p>
            Your flashcards are securely stored locally in your browser. Key
            tips:
          </p>
          <ul className="list-disc ml-8 space-y-2">
            <li>
              Keep your total data size under <strong>5MB</strong> to prevent
              issues.
            </li>
            <li>Export your decks regularly to back up your progress.</li>
          </ul>
        </Section>

        <Section id="controls" title="Controls">
          <p>Master these controls for seamless interaction:</p>
          <ul className="list-disc ml-8 space-y-2">
            <li>
              Use the <strong>Next</strong> and <strong>Previous</strong>{" "}
              buttons to navigate between cards.
            </li>
            <li>
              Press the <strong>Spacebar</strong> to flip a card and reveal the
              answer.
            </li>
          </ul>
        </Section>

        <Section id="spaced-repetition" title="Spaced Repetition">
          <p>
            Spaced repetition enhances memory retention by revisiting
            information at calculated intervals, just before it&apos;s
            forgotten. This method is scientifically proven to:
          </p>
          <ul className="list-disc ml-8 space-y-2">
            <li>Improve recall and reinforce learning efficiently.</li>
            <li>Reduce cognitive load by optimizing study time.</li>
            <li>Align with the brain&apos;s natural learning rhythms.</li>
          </ul>
          <p>
            Use this feature in your flashcard app to maximize your learning
            potential!
          </p>
        </Section>
      </div>
    </div>
  );
}

export default Guide;
