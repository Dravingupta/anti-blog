import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ style }) => {
    return (
        <header
            style={style}
            className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(255,250,242,0.92)] backdrop-blur-md h-[78px] transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">

                <Link to="/" className="flex items-center gap-3 group" aria-label="Dravin's Diary home">
                    <div className="w-10 h-10 rounded-full border border-primary/30 bg-surface flex items-center justify-center font-display font-bold text-xl text-primary transition-transform duration-300 group-hover:-rotate-6">
                        D
                    </div>
                    <div className="leading-none">
                        <span className="block font-display text-[1.35rem] font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors duration-300">Dravin's Diary</span>
                        <span className="hidden sm:block mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-text-muted">A personal journal</span>
                    </div>
                </Link>

            </div>
        </header>
    );
};

export default Header;
