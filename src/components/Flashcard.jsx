import PropTypes from "prop-types";

function Flashcard({ question, answer, isFlipped, gradient }) {
  const cardClasses = isFlipped
    ? "[transform:rotateY(180deg)]"
    : "hover:[transform:rotateY(180deg)]";

  const transitionClasses =
    "transition-transform duration-500 ease-in-out [transform-style:preserve-3d] will-change-transform";
  const backfaceVisibilityClass = "[backface-visibility:hidden]";

  return (
    <div className="flex p-5 items-center justify-center">
      <div className="perspective-[1000px]">
        <div
          className={`relative h-96 w-80 rounded-xl shadow-xl ${transitionClasses} ${cardClasses} text-black`}
        >
          <div
            className={`absolute inset-0 flex text-center items-center justify-center text-3xl font-bold text-slate-800 bg-gradient-to-r ${gradient} rounded-xl p-1 ${backfaceVisibilityClass}`}
          >
            {question}
          </div>
          <div
            className={`absolute inset-0 flex text-center items-center justify-center text-2xl text-slate-200 bg-gradient-to-r ${gradient} rounded-xl p-3 [transform:rotateY(180deg)] ${backfaceVisibilityClass}`}
          >
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

Flashcard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool,
  gradient: PropTypes.string.isRequired,
};

export default Flashcard;
