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
            <div className="flex items-end justify-between mb-8 sm:mb-10">
                <h2 className="font-display text-3xl sm:text-4xl text-text-primary flex items-center gap-3">
                    <span className="w-8 h-px bg-primary" />
                    {title}
                </h2>
                {showCount && posts.length > 0 && (
                    <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
                        {posts.length} {posts.length === 1 ? 'entry' : 'entries'}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {displayPosts.map((post, index) => (
                    <article
                        key={post._id}
                        className="paper-surface group overflow-hidden border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-soft-md"
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
                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-20 group-hover:opacity-0 transition-opacity duration-500" />
                            </Link>
                        )}

                        <div className="p-6 space-y-3 relative">
                            <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-primary">
                                {post.createdAt
                                    ? format(new Date(post.createdAt), 'MMMM d, yyyy')
                                    : ''}
                            </p>
                            <Link to={`/post/${post._id}`}>
                                <h3 className="font-display text-2xl font-bold text-text-primary leading-[1.15] mb-1 line-clamp-2 hover:text-primary transition-colors duration-300">
                                    {post.title}
                                </h3>
                            </Link>

                            <div className="border-t border-[var(--border)] pt-3 flex items-center justify-between text-xs text-text-muted">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-[10px] font-semibold text-surface transition-transform duration-300 group-hover:scale-110">
                                            D
                                        </span>
                                        <span className="group-hover:text-text-primary transition-colors duration-300">By Dravin</span>
                                    </div>
                                    <span className="text-text-muted/60">·</span>
                                    <div className="flex items-center gap-1 group-hover:text-primary transition-colors duration-300">
                                        <FaClock className="text-[10px]" />
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
