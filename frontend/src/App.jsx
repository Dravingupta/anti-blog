import { Routes, Route, Navigate } from 'react-router-dom';
import PublicHome from './pages/PublicHome';
import PostView from './pages/PostView';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ImageLibrary from './pages/ImageLibrary';
import PostEditor from './pages/PostEditor';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-text-primary">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicHome />} />
      <Route path="/post/:id" element={<PostView />} />
      <Route path="/login" element={<AdminLogin />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/create" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
      <Route path="/admin/edit/:id" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
      <Route path="/admin/images" element={<ProtectedRoute><ImageLibrary /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
