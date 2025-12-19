import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { format } from 'date-fns';
import PublicLayout from '../layouts/PublicLayout';
import { getImageUrl } from '../utils/imageUrl';
import { FaCalendar, FaUser, FaArrowLeft, FaClock, FaTwitter, FaLinkedin, FaLink, FaWhatsapp } from 'react-icons/fa';
import PostSidebar from '../components/PostSidebar';

const PostView = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [morePosts, setMorePosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await api.get(`/posts/${id}`);
                setPost(data);
            } catch (error) {
                console.error('Error fetching post', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    useEffect(() => {
        const fetchMorePosts = async () => {
            try {
                const { data } = await api.get('/posts');
                setMorePosts(data.filter(p => p._id !== id));
            } catch (error) {
                console.error('Error fetching more posts', error);
            }
        };
        if (id) {
            fetchMorePosts();
        }
    }, [id]);

    const calculateReadingTime = (content) => {
        const wordsPerMinute = 200;
        const textLength = content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
        const minutes = Math.ceil(textLength / wordsPerMinute);
        return minutes;
    };

    if (loading) return <PublicLayout><div className="text-center py-20 text-text-muted">Loading...</div></PublicLayout>;
    if (!post) return <PublicLayout><div className="text-center py-20 text-text-muted">Post not found</div></PublicLayout>;

    const readingTime = calculateReadingTime(post.content);

    return (
        <PublicLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-all mb-8 sm:mb-12 group px-3 py-2 sm:px-4 rounded-xl hover:bg-surface-alt text-sm sm:text-base"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-sm sm:text-base" />
                    <span className="font-medium">Back to Home</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    <article className="lg:col-span-8 space-y-6 sm:space-y-8">

                        <div className="bg-surface rounded-2xl sm:rounded-3xl shadow-soft-md border border-[var(--border)] overflow-hidden">

                            <div className="p-6 sm:p-10 md:px-14 md:pt-12 md:pb-8 border-b border-[var(--border)] bg-gradient-to-br from-surface-alt/50 to-surface">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6 sm:mb-8 leading-[1.2] sm:leading-[1.15]">
                                    {post.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-sm sm:text-base text-white shadow-lg">
                                            D
                                        </div>
                                        <div>
                                            <p className="text-text-primary font-medium text-sm sm:text-base">Dravin</p>
                                            <p className="text-text-muted text-xs">Author</p>
                                        </div>
                                    </div>

                                    <div className="h-6 sm:h-8 w-px bg-[var(--border)]" />

                                    <div className="flex items-center gap-2 text-text-muted">
                                        <FaCalendar className="text-primary text-xs sm:text-sm" />
                                        <time className="text-text-primary text-xs sm:text-sm">
                                            {format(new Date(post.createdAt), 'MMM d, yyyy')}
                                        </time>
                                    </div>

                                    <div className="flex items-center gap-2 text-text-muted">
                                        <FaClock className="text-accent text-xs sm:text-sm" />
                                        <span className="text-text-primary text-xs sm:text-sm">{readingTime} min read</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-10 md:px-14 md:py-12">
                                <div
                                    className="prose prose-lg sm:prose-xl max-w-none
                                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-text-primary
                                    prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mb-6 sm:prose-h1:mb-8 prose-h1:mt-8 sm:prose-h1:mt-12 prose-h1:pb-3 sm:prose-h1:pb-4 prose-h1:border-b prose-h1:border-[var(--border)]
                                    prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mb-4 sm:prose-h2:mb-6 prose-h2:mt-6 sm:prose-h2:mt-10
                                    prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mb-3 sm:prose-h3:mb-5 prose-h3:mt-5 sm:prose-h3:mt-8
                                    prose-p:text-text-primary prose-p:leading-[1.75] sm:prose-p:leading-[1.85] prose-p:mb-6 sm:prose-p:mb-8 prose-p:text-base sm:prose-p:text-lg
                                    prose-a:text-primary prose-a:no-underline hover:prose-a:text-accent prose-a:transition-colors prose-a:font-medium prose-a:border-b prose-a:border-primary/30 hover:prose-a:border-accent
                                    prose-img:rounded-2xl sm:prose-img:rounded-3xl prose-img:shadow-soft-md prose-img:my-8 sm:prose-img:my-12 prose-img:border prose-img:border-[var(--border)]
                                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gradient-to-r prose-blockquote:from-primary/10 prose-blockquote:to-transparent prose-blockquote:py-4 sm:prose-blockquote:py-6 prose-blockquote:px-5 sm:prose-blockquote:px-8 prose-blockquote:rounded-r-xl sm:prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-text-primary prose-blockquote:my-6 sm:prose-blockquote:my-10 prose-blockquote:text-base sm:prose-blockquote:text-lg prose-blockquote:font-medium
                                    prose-code:bg-primary/10 prose-code:rounded-lg prose-code:px-1.5 sm:prose-code:px-2 prose-code:py-0.5 sm:prose-code:py-1 prose-code:text-accent prose-code:text-sm sm:prose-code:text-base prose-code:font-mono prose-code:border prose-code:border-primary/20
                                    prose-pre:bg-surface-alt prose-pre:rounded-xl sm:prose-pre:rounded-2xl prose-pre:p-4 sm:prose-pre:p-6 prose-pre:my-6 sm:prose-pre:my-10 prose-pre:border prose-pre:border-[var(--border)] prose-pre:shadow-inner
                                    prose-ul:text-text-primary prose-ul:my-6 sm:prose-ul:my-8 prose-ul:text-base sm:prose-ul:text-lg
                                    prose-ol:text-text-primary prose-ol:my-6 sm:prose-ol:my-8 prose-ol:text-base sm:prose-ol:text-lg
                                    prose-li:text-text-primary prose-li:my-2 sm:prose-li:my-3 prose-li:leading-relaxed
                                    prose-strong:text-text-primary prose-strong:font-bold
                                    prose-em:text-text-primary prose-em:italic
                                    first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:mr-1.5 sm:first-letter:mr-2 first-letter:float-left first-letter:leading-[0.9]"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            </div>
                        </div>

                        {/* Share Section */}
                        <div className="bg-surface-alt/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[var(--border)]">
                            <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3 sm:mb-4">Share this article</h3>
                            <div className="flex flex-row gap-3 justify-center sm:justify-start">
                                <button
                                    onClick={() => {
                                        const url = window.location.href;
                                        const text = post.title;
                                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                                    }}
                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-xl hover:bg-[#1DA1F2]/20 transition-all hover:scale-105 font-medium text-sm sm:text-base border border-[#1DA1F2]/20"
                                >
                                    <FaTwitter className="text-lg sm:text-base" />
                                    <span className="hidden sm:inline">Twitter</span>
                                </button>
                                <button
                                    onClick={() => {
                                        const url = window.location.href;
                                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                                    }}
                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 bg-[#0A66C2]/10 text-[#0A66C2] rounded-xl hover:bg-[#0A66C2]/20 transition-all hover:scale-105 font-medium text-sm sm:text-base border border-[#0A66C2]/20"
                                >
                                    <FaLinkedin className="text-lg sm:text-base" />
                                    <span className="hidden sm:inline">LinkedIn</span>
                                </button>
                                <button
                                    onClick={() => {
                                        const url = window.location.href;
                                        const text = post.title;
                                        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                                    }}
                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366]/10 text-[#25D366] rounded-xl hover:bg-[#25D366]/20 transition-all hover:scale-105 font-medium text-sm sm:text-base border border-[#25D366]/20"
                                >
                                    <FaWhatsapp className="text-lg sm:text-base" />
                                    <span className="hidden sm:inline">WhatsApp</span>
                                </button>
                                <button
                                    onClick={() => {
                                        const url = window.location.href;
                                        navigator.clipboard.writeText(url).then(() => {
                                            alert('Link copied to clipboard!');
                                        });
                                    }}
                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all hover:scale-105 font-medium text-sm sm:text-base border border-primary/20"
                                >
                                    <FaLink className="text-lg sm:text-base" />
                                    <span className="hidden sm:inline">Copy</span>
                                </button>
                            </div>
                        </div>

                        {/* Back CTA */}
                        <div className="text-center pt-4 sm:pt-8">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl sm:rounded-2xl font-bold hover:scale-105 hover:shadow-lg transition-all text-sm sm:text-base"
                            >
                                <FaArrowLeft className="text-sm sm:text-base" />
                                <span className="hidden sm:inline">Explore More Articles</span>
                                <span className="sm:hidden">More Articles</span>
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar - Right Column */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6 sm:space-y-8">
                            {/* Author Card */}
                            <div className="bg-gradient-to-br from-surface via-surface-alt to-surface rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[var(--border)] shadow-soft-sm">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-2xl sm:text-3xl text-white shadow-lg mb-3 sm:mb-4">
                                        D
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-1 sm:mb-2">Dravin</h3>
                                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                                        Crafting stories that inspire and inform. Passionate about technology, design, and innovation.
                                    </p>
                                </div>
                            </div>

                            {/* Latest Posts Sidebar */}
                            {morePosts.length > 0 && (
                                <PostSidebar posts={morePosts} title="More Articles" limit={5} />
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </PublicLayout>
    );
};

export default PostView;
