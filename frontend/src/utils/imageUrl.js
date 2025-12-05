export const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    // Get API URL from env, default to localhost
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    // Remove '/api' suffix to get the base backend URL
    const baseUrl = apiUrl.replace(/\/api\/?$/, '');

    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    return `${baseUrl}${cleanPath}`;
};
