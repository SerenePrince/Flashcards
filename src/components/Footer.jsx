import { FaGithub, FaLinkedin, FaFolder } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white py-6 px-8 text-center">
      <div className="max-w-[70%] mx-auto">
        {/* About Section */}
        <p className="text-lg mb-4">Created by Noah Park-Nguyen</p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://github.com/SerenePrince"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-2xl hover:bg-darkgray rounded transition-colors duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/nparknguyen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl hover:bg-darkgray rounded transition-colors duration-300" />
          </a>
          <a
            href="https://sereneprince.github.io/Portfolio-2025/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFolder className="text-2xl hover:bg-darkgray rounded transition-colors duration-300" />
          </a>
        </div>

        {/* Contact Info */}
        <p className="text-sm mb-4">
          Have questions or want to collaborate? Reach out to me at{" "}
          <a href="mailto:noahparknguyen@gmail.com" className="text-darkblue">
            noahparknguyen@gmail.com
          </a>
        </p>

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
