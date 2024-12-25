import { FaFolderOpen, FaHome, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-darkblue p-5 flex flex-col sm:flex-row justify-between items-center text-white shadow-md">
      {/* Title */}
      <Link to="/" className="font-bold text-3xl mb-4 sm:mb-0">
        Flashcards
      </Link>

      {/* Navigation */}
      <nav className="w-full">
        <ul className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 sm:justify-end">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-2 hover:bg-lightblue rounded transition-colors duration-300 p-3"
            >
              <FaHome size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/library"
              className="flex items-center space-x-2 hover:bg-lightblue rounded transition-colors duration-300 p-3"
            >
              <FaFolderOpen size={20} />
              <span>Library</span>
            </Link>
          </li>
          <li>
            <Link
              to="/guide"
              className="flex items-center space-x-2 hover:bg-lightblue rounded transition-colors duration-300 p-3"
            >
              <FaQuestionCircle size={20} />
              <span>Guide</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
