import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', { username, password });
            if (data.ok) {
                login(data.token);
                navigate('/admin');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-surface p-8 sm:p-10 rounded-2xl shadow-xl border border-[rgba(242,239,234,0.08)]">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary tracking-tight">
                        Admin Login
                    </h2>
                    <p className="mt-2 text-center text-sm text-text-muted">
                        Sign in to manage your blog
                    </p>
                </div>
                {error && (
                    <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-r">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-danger">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-[rgba(242,239,234,0.1)] bg-surface-alt placeholder-text-muted text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:z-10 sm:text-sm transition-all"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-[rgba(242,239,234,0.1)] bg-surface-alt placeholder-text-muted text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:z-10 sm:text-sm transition-all"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 shadow-lg shadow-primary/30 hover:scale-[1.02]"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
