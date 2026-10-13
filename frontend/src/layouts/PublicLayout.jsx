import React from 'react';
import Header from '../components/Header';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const PublicLayout = ({ children }) => {
    const { user } = useAuth();

    return (
        <div className="diary-shell min-h-screen font-sans text-text-primary flex flex-col overflow-x-hidden">
            {user ? <AdminHeader /> : <Header />}
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
