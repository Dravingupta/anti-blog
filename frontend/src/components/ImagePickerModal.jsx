import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import ImageLibrary from '../pages/ImageLibrary';

const ImagePickerModal = ({ isOpen, onClose, onSelect }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative w-full max-w-4xl bg-surface rounded-2xl shadow-soft-md overflow-hidden flex flex-col max-h-[90vh] animate-[scaleIn_0.22s_ease-out]">
                <div className="flex justify-between items-center p-6 border-b border-[rgba(242,239,234,0.04)]">
                    <h2 className="text-xl font-semibold text-text-primary">Select Image</h2>
                    <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
                        <FaTimes size={20} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 bg-background">
                    <ImageLibrary
                        selectMode={true}
                        onSelect={(img) => {
                            onSelect(img);
                            onClose();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImagePickerModal;
