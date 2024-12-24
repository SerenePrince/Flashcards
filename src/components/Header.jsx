import { FaFolderOpen, FaHome, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="p-5 flex justify-between items-center text-white">
      {/* Title */}
      <Link to="/" className="font-bold text-2xl">
        Flashcards
      </Link>

      {/* Navigation */}
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-1 hover:bg-darkgray rounded transition-colors duration-300 p-2"
            >
              <FaHome size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/library"
              className="flex items-center space-x-1 hover:bg-darkgray rounded transition-colors duration-300 p-2"
            >
              <FaFolderOpen size={20} />
              <span>Library</span>
            </Link>
          </li>
          <li>
            <Link
              to="/guide"
              className="flex items-center space-x-1 hover:bg-darkgray rounded transition-colors duration-300 p-2"
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
