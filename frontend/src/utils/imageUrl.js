export const getImageUrl = (path) => {
    if (!path) return '';

    // If it's already a full URL (Cloudinary), return as-is
    if (path.startsWith('http')) return path;

    // For backward compatibility with old relative paths
    // VITE_API_URL must be set in production environment variables
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
        console.error('VITE_API_URL is not set. Please configure it in your environment variables.');
        return path; // Return path as-is if no API URL configured
    }

    const baseUrl = apiUrl.replace(/\/api\/?$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    return `${baseUrl}${cleanPath}`;
};

