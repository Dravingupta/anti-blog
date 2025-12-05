import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getImageUrl } from '../utils/imageUrl';

const PostSidebar = ({ posts, title = "Latest Posts", limit = 5 }) => {
    const displayPosts = posts.slice(0, limit);

    if (posts.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary flex items-center gap-2 sm:gap-3">
                <span className="w-1 h-5 sm:h-6 rounded-full bg-primary" />
                {title}
            </h3>

            <div className="space-y-3 sm:space-y-4">
                {displayPosts.map((post) => (
                    <Link
                        key={post._id}
                        to={`/post/${post._id}`}
                        className="block bg-surface rounded-xl shadow-soft-sm overflow-hidden hover:-translate-y-0.5 hover:shadow-soft-md transition-all duration-300 group"
                    >
                        {post.featuredImage && (
                            <div className="aspect-video overflow-hidden relative">
                                <img
                                    src={getImageUrl(post.featuredImage.url)}
                                    alt={post.featuredImage.altText || post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
                            </div>
                        )}

                        <div className="p-4 space-y-1">
                            <p className="text-xs text-text-muted">
                                {post.createdAt
                                    ? format(new Date(post.createdAt), 'MMM d, yyyy')
                                    : ''}
                            </p>
                            <h4 className="text-sm font-semibold text-text-primary leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                {post.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PostSidebar;
