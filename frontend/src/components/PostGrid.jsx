import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getImageUrl } from '../utils/imageUrl';
import { FaClock } from 'react-icons/fa';

const PostGrid = ({ posts, title = "Latest Blogs", showCount = true, limit }) => {
    const displayPosts = limit ? posts.slice(0, limit) : posts;

    const calculateReadTime = (content) => {
        if (!content) return 1;
        const wordsPerMinute = 200;
        const text = content.replace(/<[^>]+>/g, ''); // Strip HTML tags
        const wordCount = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return minutes || 1;
    };

    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-text-primary flex items-center gap-2 sm:gap-3">
                    <span className="w-1 h-6 sm:h-7 rounded-full bg-primary" />
                    {title}
                </h2>
                {showCount && posts.length > 0 && (
                    <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
                        {posts.length} {posts.length === 1 ? 'entry' : 'entries'}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8" style={{ perspective: '1000px' }}>
                {displayPosts.map((post, index) => (
                    <article
                        key={post._id}
                        className="group bg-surface rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_60px_rgb(0,0,0,0.3)] transition-all duration-500 transform hover:scale-[1.02] hover:rotate-[0.5deg]"
                        style={{
                            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {post.featuredImage && (
                            <Link
                                to={`/post/${post._id}`}
                                className="block aspect-video overflow-hidden relative"
                            >
                                <img
                                    src={getImageUrl(post.featuredImage.url)}
                                    alt={post.featuredImage.altText || post.title}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
                            </Link>
                        )}

                        <div className="p-5 space-y-2 relative">
                            <p className="text-xs text-text-muted animate-pulse-slow">
                                {post.createdAt
                                    ? format(new Date(post.createdAt), 'MMMM d, yyyy')
                                    : ''}
                            </p>
                            <Link to={`/post/${post._id}`}>
                                <h3 className="text-lg font-semibold text-text-primary leading-snug mb-1 line-clamp-2 hover:text-primary transition-all duration-300 group-hover:translate-x-1">
                                    {post.title}
                                </h3>
                            </Link>

                            <div className="pt-2 flex items-center justify-between text-xs text-text-muted">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-semibold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            D
                                        </span>
                                        <span className="group-hover:text-text-primary transition-colors duration-300">By Dravin</span>
                                    </div>
                                    <span className="text-text-muted/60">•</span>
                                    <div className="flex items-center gap-1 group-hover:text-primary transition-colors duration-300">
                                        <FaClock className="text-[10px] animate-spin-slow" />
                                        <span>{calculateReadTime(post.content)} min read</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default PostGrid;
