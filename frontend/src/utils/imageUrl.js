export const getImageUrl = (path) => {
    if (!path) return '';

    // If it's already a full URL (Cloudinary), return as-is
    if (path.startsWith('http')) return path;

    // For backward compatibility with old relative paths
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const baseUrl = apiUrl.replace(/\/api\/?$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    return `${baseUrl}${cleanPath}`;
};

