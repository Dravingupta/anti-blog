import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaPen, FaImages, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const navItems = [
        { path: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
        { path: '/admin/create', icon: FaPen, label: 'New Post' },
        { path: '/admin/images', icon: FaImages, label: 'Image Library' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-[rgba(242,239,234,0.04)] p-6 transform transition-transform duration-300 ease-in-out
                lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-[var(--bg)] font-bold text-lg shadow-sm">
                        A
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-text-primary">Admin</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive(item.path)
                                ? 'bg-[rgba(206,158,113,0.06)] text-primary border-l-4 border-primary'
                                : 'text-text-muted hover:bg-surface-alt hover:text-text-primary'
                                }`}
                        >
                            <item.icon className="text-lg" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-[rgba(242,239,234,0.04)]">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-text-muted hover:bg-danger/10 hover:text-danger transition-colors font-medium"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
                    onClick={onClose}
                />
            )}
        </>
    );
};

export default AdminSidebar;
