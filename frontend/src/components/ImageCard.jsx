import React from 'react';
import { FaTrash, FaCopy, FaCheck } from 'react-icons/fa';
import { getImageUrl } from '../utils/imageUrl';

const ImageCard = ({ image, onSelect, onDelete, selectMode }) => {
    const handleCopy = (e) => {
        e.stopPropagation();
        const fullUrl = getImageUrl(image.url);
        navigator.clipboard.writeText(fullUrl);
        alert('Copied to clipboard!');
    };

    return (
        <div
            className="group relative rounded-xl overflow-hidden shadow-soft-sm bg-surface hover:-translate-y-1 hover:shadow-soft-md transition-all duration-300 cursor-pointer"
            onClick={() => onSelect && onSelect(image)}
        >
            <div className="aspect-square bg-surface-alt relative">
                <img
                    src={getImageUrl(image.url)}
                    alt={image.altText}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-[rgba(0,0,0,0.45)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    {selectMode ? (
                        <div className="bg-primary text-[var(--bg)] p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform">
                            <FaCheck />
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={handleCopy}
                                className="bg-surface text-text-primary p-2 rounded-lg hover:scale-110 transition-transform shadow-sm"
                                title="Copy URL"
                            >
                                <FaCopy />
                            </button>
                            {onDelete && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDelete(image._id); }}
                                    className="bg-surface text-danger p-2 rounded-lg hover:scale-110 transition-transform shadow-sm"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="p-3 border-t border-[rgba(242,239,234,0.03)]">
                <p className="text-xs font-medium text-text-primary truncate">{image.filename}</p>
                <p className="text-[10px] text-text-muted mt-0.5">
                    {new Date(image.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default ImageCard;
