import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import PublicLayout from '../layouts/PublicLayout';
import PrimaryButton from '../components/PrimaryButton';
import PostGrid from '../components/PostGrid';

const PublicHome = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await api.get('/posts');
                setPosts(data || []);
            } catch (error) {
                console.error('Error fetching posts', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <PublicLayout>
            <section className="relative pt-16 pb-10 lg:pt-20 lg:pb-12 bg-gradient-to-b from-surface-alt via-bg to-bg overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,135,111,0.06),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(168,159,145,0.04),transparent_60%)] pointer-events-none animate-pulse-slow" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <header className="mb-10" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-3 hover:scale-105 transition-transform duration-300 inline-block">
                            Thoughts, stories, and <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ideas.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed" style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
                            A modern space for minimalist writing and clear thinking. Explore our latest stories below.
                        </p>
                    </header>
                </div>
            </section>

            {loading ? (
                <div className="text-center py-16 text-text-muted">Loading...</div>
            ) : posts.length === 0 ? (
                <div className="text-center py-16 text-text-muted">
                    Nothing here yet. Check back soon for new posts.
                </div>
            ) : (
                <>
                    <PostGrid
                        posts={posts}
                        title="Latest Stories"
                        limit={showAll ? undefined : 6}
                    />

                    {posts.length > 6 && !showAll && (
                        <div className="flex justify-center pb-16">
                            <PrimaryButton
                                onClick={() => setShowAll(true)}
                                className="px-8"
                            >
                                Load More
                            </PrimaryButton>
                        </div>
                    )}
                </>
            )}
        </PublicLayout>
    );
};

export default PublicHome;
