import React from 'react';

const PrimaryButton = ({ children, onClick, type = 'button', className = '', disabled = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`bg-primary text-[var(--bg)] rounded-xl py-2 px-4 shadow-sm hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:hover:scale-100 font-medium ${className}`}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
