import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import AdminLayout from '../layouts/AdminLayout';
import ImageUploader from '../components/ImageUploader';
import ImageCard from '../components/ImageCard';
import { FaSearch } from 'react-icons/fa';

const ImageLibrary = ({ selectMode = false, onSelect }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchImages = async () => {
        try {
            const { data } = await api.get('/images');
            setImages(data);
        } catch (err) {
            console.error('Failed to load images', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this image?')) return;
        try {
            await api.delete(`/images/${id}`);
            setImages(images.filter(img => img._id !== id));
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const filteredImages = images.filter(img =>
        img.filename.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const Content = () => (
        <div className="space-y-8">
            <div className="bg-[rgba(39,35,32,0.03)] border-dashed border-2 border-[rgba(242,239,234,0.06)] rounded-2xl p-8 text-center hover:border-primary/30 transition-colors">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Upload New Images</h3>
                <ImageUploader onUploadSuccess={(newImage) => setImages([newImage, ...images])} />
            </div>

            <div className="relative max-w-md">
                <input
                    type="text"
                    placeholder="Search images..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-surface border border-[rgba(242,239,234,0.04)] rounded-xl py-3 px-4 pl-10 focus:outline-none focus:ring-4 focus:ring-[var(--focus-ring)] shadow-soft-sm text-text-primary placeholder:text-text-muted/50"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {filteredImages.map((img) => (
                        <ImageCard
                            key={img._id}
                            image={img}
                            onDelete={!selectMode ? handleDelete : undefined}
                            onSelect={onSelect}
                            selectMode={selectMode}
                        />
                    ))}
                </div>
            )}
        </div>
    );

    if (selectMode) return <Content />;

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary tracking-tight">Image Library</h1>
                <p className="text-text-muted mt-1">Manage your media assets.</p>
            </div>
            <Content />
        </AdminLayout>
    );
};

export default ImageLibrary;
