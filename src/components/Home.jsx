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

function IntroSection() {
  return (
    <section className="bg-lightred py-6 px-6 flex items-center">
      <div className="flex flex-col lg:flex-row justify-between items-center max-w-[75%] mx-auto">
        <div className="flex flex-col text-left lg:mr-8 mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold mb-4">
            Build Flashcards That Match Your Learning Style
          </h1>
          <p className="text-lg">
            Easily create custom flashcards tailored to your learning style.
            Whether you&apos;re preparing for an exam or exploring new topics,
            our intuitive tool helps you stay focused, organized, and motivated.
          </p>
          <Link to="/guide#create-deck">
            <button className="mt-4 py-2 bg-gradient-to-r from-lightorange to-lightyellow px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:shadow-lg hover:scale-105">
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
  background,
  buttonGradient,
}) {
  return (
    <section className={`py-12 px-6 ${background}`}>
      <div className="flex flex-col lg:flex-row items-center max-w-[80%] mx-auto">
        <Icon className="text-7xl mb-6 lg:mb-0 lg:mr-10" />
        <div className="flex flex-col text-center lg:text-left">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-lg mb-4">{description}</p>
          <Link to={link}>
            <button
              className={`py-2 bg-gradient-to-r ${buttonGradient} px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:shadow-lg hover:scale-105`}
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
  background: PropTypes.string.isRequired,
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
        background="bg-lightorange"
        buttonGradient="from-lightyellow to-lightgreen"
      />

      <FeatureSection
        title="Create Flashcards in Minutes"
        description="Create flashcards in just a few minutes with an easy-to-use process. Simply enter your questions and answers, and you're ready to start. No complicated steps—just pure learning simplicity."
        link="/create"
        buttonText="Start Creating Now"
        icon={FaFastForward}
        background="bg-lightyellow"
        buttonGradient="from-lightgreen to-lightblue"
      />

      <FeatureSection
        title="Your Decks, Always Safe"
        description="Your flashcards are securely saved in your browser, giving you quick access whenever you need them. You can also back up your decks to ensure your learning progress is always safe."
        link="/guide#save"
        buttonText="Keep Your Decks Safe"
        icon={FaSave}
        background="bg-lightgreen"
        buttonGradient="from-lightblue to-lightpurple"
      />

      <FeatureSection
        title="Effortless Deck Importing"
        description="Easily import your existing decks with our simple JSON template. Just format your files and upload as many decks as you need—no hassle."
        link="/import"
        buttonText="Import Your Flashcards Now"
        icon={FaFileImport}
        background="bg-lightblue"
        buttonGradient="from-lightpurple to-lightlavender"
      />

      <FeatureSection
        title="Start Learning Today"
        description="Start creating or importing your first deck today and discover how simple and effective studying can be with a tool designed for your success."
        link="/library"
        buttonText="Create Your First Deck"
        icon={FaFlagCheckered}
        background="bg-lightpurple"
        buttonGradient="from-lightlavender to-lightpink"
      />
    </div>
  );
}

export default Home;
