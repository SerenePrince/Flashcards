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
    <section className="bg-gradient-to-r from-lightred via-lightorange to-lightyellow py-6 px-6 items-center">
      <div className="flex flex-col lg:flex-row justify-between items-center max-w-[75%] mx-auto">
        <div className="flex flex-col text-left lg:mr-8 mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold mb-4 text-black">
            Build Flashcards That Match Your Learning Style
          </h1>
          <p className="text-lg text-black">
            Creating custom flashcards has never been easier. Whether
            you&apos;re preparing for an exam or diving into a new subject,
            flashcards help you stay organized, motivated, and in control of
            your learning journey. It&apos;s time to make learning fun!
          </p>
          <div className="flex justify-start">
            <Link
              to="/library"
              className="mt-4 bg-gradient-to-r from-lightorange to-lightyellow text-black py-2 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 inline-block whitespace-nowrap"
            >
              Start Creating Your Decks Now
            </Link>
          </div>
        </div>

        <Flashcard
          question={"Write down your questions"}
          answer={"See your answers"}
          isFlipped={false}
          gradient={["from-lightgreen to-lightblue"]}
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
  background = "bg-black", // Default background if none is passed
  buttonGradient,
}) {
  return (
    <section className={`py-12 px-6 ${background} bg-opacity-80`}>
      <div className="flex flex-col lg:flex-row items-center max-w-[80%] mx-auto">
        <Icon className="text-7xl mb-6 lg:mb-0 lg:mr-10" />
        <div className="flex flex-col text-center lg:text-left">
          <h1 className="text-3xl font-bold mb-4 text-black">{title}</h1>
          <p className="text-lg text-black mb-4">{description}</p>
          <div className="flex justify-start">
            <Link
              to={link}
              className={`flex py-2 px-6 text-black rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 bg-gradient-to-r ${buttonGradient}`}
            >
              {buttonText}
            </Link>
          </div>
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
        title="Repetition Legitimizes Learning"
        description="Unlock the secret to long-term retention. With spaced repetition, our flashcards ensure that you remember crucial information at just the right time—transforming your study sessions into highly effective learning experiences."
        link="/guide#spaced"
        buttonText="Learn How Spaced Repetition Helps You"
        icon={FaRepeat}
        background="bg-gradient-to-r from-lightorange via-lightyellow to-lightgreen"
        buttonGradient="from-lightyellow to-lightgreen"
      />

      <FeatureSection
        title="Create Flashcards in Minutes"
        description="Need flashcards fast? Create your own custom decks in just minutes. With an easy-to-use interface, simply add questions and answers, and you're all set—no complex steps, just pure learning simplicity."
        link="/create"
        buttonText="Start Creating Now"
        icon={FaFastForward}
        background="bg-gradient-to-r from-lightyellow via-lightgreen to-lightblue"
        buttonGradient="from-lightgreen to-lightblue"
      />

      <FeatureSection
        title="Your Decks, Always Safe"
        description="Never worry about losing your progress. Your flashcards are saved securely in your browser for instant access whenever you need them. Plus, you can back up your decks to keep your learning progress safe and sound."
        link="/guide#save"
        buttonText="Keep Your Decks Safe"
        icon={FaSave}
        background="bg-gradient-to-r from-lightgreen via-lightblue to-lightpurple"
        buttonGradient="from-lightblue to-lightpurple"
      />

      <FeatureSection
        title="Seamless Deck Management"
        description="Easily import your existing flashcards or export your decks to keep your study materials organized. Whether you're starting fresh or bringing in data from other sources, our intuitive platform ensures your decks are always accessible and up-to-date."
        link="/guide#import-deck"
        buttonText="Learn How to Manage Your Decks"
        icon={FaFileImport}
        background="bg-gradient-to-r from-lightblue via-lightpurple to-lightlavender"
        buttonGradient="from-lightpurple to-lightlavender"
      />

      <FeatureSection
        title="Start Learning Today"
        description="It's time to stop procrastinating. Start creating your flashcards or import your first deck today and see how simple and powerful studying can be with the right tools in your hands."
        link="/guide"
        buttonText="Create Your First Deck"
        icon={FaFlagCheckered}
        background="bg-gradient-to-r from-lightpurple via-lightlavender to-lightpink"
        buttonGradient="from-lightlavender to-lightpink"
      />
    </div>
  );
}

export default Home;
