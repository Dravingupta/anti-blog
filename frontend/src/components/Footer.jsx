import React from "react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="mt-16 border-t border-[var(--border)] bg-[#080808]/98 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Left: copyright */}
                <p className="text-xs sm:text-sm text-[var(--text-muted)] text-center sm:text-left">
                    © {new Date().getFullYear()} AntiBlog. All rights reserved.
                </p>

                {/* Right: social icons */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <a
                        href="https://github.com/Dravingupta"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--bg)] hover:bg-[var(--primary)] transition-colors duration-200"
                    >
                        <FaGithub className="text-sm" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/dravingupta/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--bg)] hover:bg-[var(--primary)] transition-colors duration-200"
                    >
                        <FaLinkedin className="text-sm" />
                    </a>
                    <a
                        href="https://drg-rho.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Portfolio"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--bg)] hover:bg-[var(--primary)] transition-colors duration-200"
                    >
                        <FaGlobe className="text-sm" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
