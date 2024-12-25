import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-darkblue text-white py-8 px-6 text-center shadow-md">
      <div className="max-w-[80%] mx-auto">
        {/* About Section */}
        <p className="text-lg mb-6">Created by Noah Park-Nguyen</p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-8 mb-6">
          <a
            href="https://github.com/SerenePrince"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-lightblue transition-colors duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/nparknguyen/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-lightblue transition-colors duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:noahparknguyen@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-lightblue transition-colors duration-300"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Project Info */}
        <p className="text-sm mb-4">
          Built with React, Tailwind CSS, and a lot of trial and error!
        </p>

        {/* Copyright */}
        <p className="text-sm">© 2024 Noah Park-Nguyen. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
