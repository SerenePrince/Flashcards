import PropTypes from "prop-types";

// Section Component
const Section = ({ id, title, children }) => (
  <section id={id} className="mb-16">
    <h2 className="text-3xl font-semibold mb-6">{title}</h2>
    <div className="text-lg leading-relaxed space-y-6">{children}</div>
  </section>
);

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function Guide() {
  return (
    <div className="text-white py-12 px-8 bg-black">
      <div className="max-w-[70%] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Guide to Your Flashcard App
        </h1>

        <table className="w-full border-collapse mb-12 shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-600 py-4 px-6 text-left">
                Section
              </th>
              <th className="border border-gray-600 py-4 px-6 text-left">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                href: "#create-deck",
                text: "Create Your First Deck",
                desc: "Learn how to create and save your first set of flashcards.",
              },
              {
                href: "#library",
                text: "Library",
                desc: "Manage your decks, import, export, and more.",
              },
              {
                href: "#save",
                text: "Save",
                desc: "Understand how your decks are saved and stored.",
              },
              {
                href: "#controls",
                text: "Controls",
                desc: "Navigate and interact with your flashcards efficiently.",
              },
              {
                href: "#spaced-repetition",
                text: "Spaced Repetition",
                desc: "Learn about the benefits of this learning technique.",
              },
            ].map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                } hover:bg-gray-700`}
              >
                <td className="border border-gray-600 py-4 px-6">
                  <a href={row.href} className="text-blue-400 hover:underline">
                    {row.text}
                  </a>
                </td>
                <td className="border border-gray-600 py-4 px-6 text-gray-300">
                  {row.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Section id="create-deck" title="Create Your First Deck">
          <p>Follow these steps to create a new deck:</p>
          <ol className="list-decimal ml-8 space-y-2">
            <li>
              Navigate to the <strong>Library</strong>.
            </li>
            <li>
              Click <strong>Create Deck</strong>.
            </li>
            <li>
              Provide a <strong>title</strong> and an optional{" "}
              <strong>description</strong>.
            </li>
            <li>Add questions and answers to your deck.</li>
            <li>
              Click <strong>Save Deck</strong> to finish.
            </li>
          </ol>
        </Section>

        <Section id="library" title="Library">
          <p>
            The <strong>Library</strong> is your hub for managing decks:
          </p>
          <ul className="list-disc ml-8 space-y-2">
            <li>Create, delete, or update decks.</li>
            <li>Import decks using a JSON template.</li>
            <li>Export decks to share or back up your data.</li>
          </ul>
        </Section>

        <Section id="save" title="Save">
          <p>All decks are saved locally in your browser. To avoid issues:</p>
          <ul className="list-disc ml-8 space-y-2">
            <li>
              Keep your data size under <strong>5MB</strong>.
            </li>
            <li>Export decks for backup when nearing the limit.</li>
          </ul>
        </Section>

        <Section id="controls" title="Controls">
          <p>Here’s how to navigate and interact with your flashcards:</p>
          <ul className="list-disc ml-8 space-y-2">
            <li>
              Use <strong>Next</strong> and <strong>Previous</strong> buttons to
              browse cards.
            </li>
            <li>
              Hold the <strong>Spacebar</strong> to flip a card.
            </li>
          </ul>
        </Section>

        <Section id="spaced-repetition" title="Spaced Repetition">
          <p>
            Spaced repetition helps you retain information by reviewing cards at
            strategic intervals.
          </p>
        </Section>
      </div>
    </div>
  );
}

export default Guide;
