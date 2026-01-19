import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ style }) => {
    return (
        <header
            style={style}
            className="sticky top-0 z-50 backdrop-blur-md bg-surface/90 border-b border-[var(--border)] h-[72px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">

                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold text-lg shadow-[0_4px_15px_rgba(212,135,111,0.4)] group-hover:shadow-[0_8px_25px_rgba(212,135,111,0.6)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-float">
                        A
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-[var(--text-primary)] group-hover:tracking-wider group-hover:text-primary transition-all duration-300">
                        AntiBlog
                    </span>
                </Link>

            </div>
        </header>
    );
};

export default Header;
