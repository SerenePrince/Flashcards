import PropTypes from "prop-types";
import Flashcard from "./Flashcard";
import {
  FaFastForward,
  FaSave,
  FaFileImport,
  FaFlagCheckered,
} from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { Link } from "react-router-dom";

// Reusable button styling as a CSS class for maintainability
const buttonStyles =
  "py-2 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105";

function IntroSection() {
  return (
    <section className="bg-gradient-to-r from-lightred via-lightorange to-lightyellow py-6 px-6 flex items-center">
      <div className="flex flex-col lg:flex-row justify-between items-center max-w-[75%] mx-auto">
        <div className="flex flex-col text-left lg:mr-8 mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold mb-4 text-black">
            Build Flashcards That Match Your Learning Style
          </h1>
          <p className="text-lg text-black">
            Easily create custom flashcards tailored to your learning style.
            Whether you&apos;re preparing for an exam or exploring new topics,
            our intuitive tool helps you stay focused, organized, and motivated.
          </p>
          <Link to="/guide#create-deck">
            <button
              className={`mt-4 bg-gradient-to-r from-lightorange to-lightyellow text-black hover:from-lightyellow hover:to-lightgreen ${buttonStyles}`}
            >
              Start Creating Your Decks Now
            </button>
          </Link>
        </div>

        <Flashcard
          question={"Write down your questions"}
          answer={"See your answers"}
          gradient={["from-lightgreen to-lightblue"]}
          className="w-full lg:w-auto"
        />
      </div>
    </section>
  );
}

function FeatureSection({
  title,
  description,
  link,
  buttonText,
  icon: Icon,
  background = "bg-lightgray", // Default background if none is passed
  buttonGradient,
}) {
  return (
    <section className={`py-12 px-6 ${background} bg-opacity-80`}>
      <div className="flex flex-col lg:flex-row items-center max-w-[80%] mx-auto">
        <Icon className="text-7xl mb-6 lg:mb-0 lg:mr-10" />
        <div className="flex flex-col text-center lg:text-left">
          <h1 className="text-3xl font-bold mb-4 text-black">{title}</h1>
          <p className="text-lg text-black mb-4">{description}</p>
          <Link to={link}>
            <button
              className={`py-2 bg-gradient-to-r ${buttonGradient} text-black ${buttonStyles}`}
            >
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

FeatureSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  background: PropTypes.string,
  buttonGradient: PropTypes.string.isRequired,
};

function Home() {
  return (
    <div className="text-black">
      <IntroSection />

      <FeatureSection
        title="Repetition Legitimises"
        description="Harness the power of repetition for long-term retention. With spaced repetition, our flashcards ensure that you remember key information when you need it most, making learning more efficient and effective."
        link="/guide#spaced-repetition"
        buttonText="Learn How Spaced Repetition Helps You"
        icon={FaRepeat}
        background="bg-gradient-to-r from-lightorange via-lightyellow to-lightgreen"
        buttonGradient="from-lightyellow to-lightgreen"
      />

      <FeatureSection
        title="Create Flashcards in Minutes"
        description="Create flashcards in just a few minutes with an easy-to-use process. Simply enter your questions and answers, and you're ready to start. No complicated steps—just pure learning simplicity."
        link="/create"
        buttonText="Start Creating Now"
        icon={FaFastForward}
        background="bg-gradient-to-r from-lightyellow via-lightgreen to-lightblue"
        buttonGradient="from-lightgreen to-lightblue"
      />

      <FeatureSection
        title="Your Decks, Always Safe"
        description="Your flashcards are securely saved in your browser, giving you quick access whenever you need them. You can also back up your decks to ensure your learning progress is always safe."
        link="/guide#save"
        buttonText="Keep Your Decks Safe"
        icon={FaSave}
        background="bg-gradient-to-r from-lightgreen via-lightblue to-lightpurple"
        buttonGradient="from-lightblue to-lightpurple"
      />

      <FeatureSection
        title="Effortless Deck Importing"
        description="Easily import your existing decks with our simple JSON template. Just format your files and upload as many decks as you need—no hassle."
        link="/import"
        buttonText="Import Your Flashcards Now"
        icon={FaFileImport}
        background="bg-gradient-to-r from-lightblue via-lightpurple to-lightlavender"
        buttonGradient="from-lightpurple to-lightlavender"
      />

      <FeatureSection
        title="Start Learning Today"
        description="Start creating or importing your first deck today and discover how simple and effective studying can be with a tool designed for your success."
        link="/library"
        buttonText="Create Your First Deck"
        icon={FaFlagCheckered}
        background="bg-gradient-to-r from-lightpurple via-lightlavender to-lightpink"
        buttonGradient="from-lightlavender to-lightpink"
      />
    </div>
  );
}

export default Home;
