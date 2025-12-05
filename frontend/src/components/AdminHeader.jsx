import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HiSearch, HiBell, HiUser, HiLogout, HiCog, HiPlus, HiMenu } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

const AdminHeader = ({ onToggleSidebar, isSidebarOpen }) => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Determine Page Title
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/admin') return 'Dashboard';
        if (path === '/admin/create') return 'Create New Post';
        if (path.includes('/admin/edit')) return 'Edit Post';
        if (path === '/admin/images') return 'Image Library';
        if (path === '/') return 'Home';
        if (path.includes('/post/')) return 'Article View';
        return 'Admin';
    };

    return (
        <header className="sticky top-0 z-30 px-4 sm:px-6 py-3 sm:py-4 bg-surface-alt border-b border-[rgba(255,255,255,0.05)] shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-between transition-all duration-300">

            {/* Left: Mobile Menu + Title */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                {/* Mobile Menu Toggle */}
                <button
                    onClick={onToggleSidebar}
                    className="lg:hidden w-10 h-10 rounded-xl bg-surface hover:bg-primary/10 flex items-center justify-center text-text-primary hover:text-primary transition-colors"
                >
                    <HiMenu className="text-xl" />
                </button>

                {/* Page Title */}
                <div className="flex flex-col min-w-0">
                    <h2 className="text-base sm:text-xl font-semibold text-text-primary tracking-tight truncate">
                        {getPageTitle()}
                    </h2>
                    <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted mt-0.5">
                        <span>Admin</span>
                        <span>/</span>
                        <span className="text-primary truncate">{getPageTitle()}</span>
                    </div>
                </div>
            </div>

            {/* Right: Utilities */}
            <div className="flex items-center gap-2 sm:gap-4">

                {/* Quick Action: New Post */}
                <Link
                    to="/admin/create"
                    className="hidden sm:flex items-center gap-2 bg-primary text-[var(--bg)] rounded-xl px-4 py-2 text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                >
                    <HiPlus className="text-lg" />
                    <span>New Post</span>
                </Link>

                {/* Mobile: New Post Icon Only */}
                <Link
                    to="/admin/create"
                    className="sm:hidden w-10 h-10 rounded-xl bg-primary text-[var(--bg)] flex items-center justify-center hover:scale-105 transition-all"
                >
                    <HiPlus className="text-lg" />
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 pr-1 py-1 rounded-xl hover:bg-[rgba(255,255,255,0.04)] transition-all border border-transparent hover:border-[rgba(255,255,255,0.05)]"
                    >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[var(--bg)] font-bold text-sm shadow-sm">
                            {user?.username ? user.username.charAt(0).toUpperCase() : 'D'}
                        </div>
                        <div className="hidden lg:block text-left mr-1">
                            <p className="text-sm font-medium text-text-primary leading-none">{user?.username || 'Dravin'}</p>
                            <p className="text-[10px] text-text-muted mt-0.5">Administrator</p>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-surface border border-[rgba(255,255,255,0.05)] rounded-xl shadow-soft-md py-1 animate-[scaleIn_0.15s_ease-out] origin-top-right overflow-hidden">
                            <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.05)]">
                                <p className="text-sm text-text-primary font-medium">Signed in as</p>
                                <p className="text-xs text-text-muted truncate">{user?.email || 'admin@antiblog.com'}</p>
                            </div>

                            <div className="py-1">
                                {/* Empty for now - can add settings later */}
                            </div>

                            <div className="border-t border-[rgba(255,255,255,0.05)] py-1">
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 flex items-center gap-2 transition-colors"
                                >
                                    <HiLogout className="text-lg" /> Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
