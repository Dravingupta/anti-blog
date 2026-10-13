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
            <section className="paper-surface relative overflow-hidden border-b border-[var(--border)] py-16 sm:py-20 lg:py-28">
                <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full border border-primary/15" />
                <div className="absolute -right-8 -top-14 h-52 w-52 rounded-full border border-accent/25" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <header className="max-w-3xl" style={{ animation: 'fadeInUp 0.7s ease-out' }}>
                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Welcome to my corner of the internet</p>
                        <h1 className="font-display text-5xl leading-[0.98] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                            Small thoughts,<br /><em className="font-normal text-primary">kept close.</em>
                        </h1>
                        <p className="mt-7 max-w-xl text-base leading-8 text-text-muted sm:text-lg">
                            Dravin's Diary is a collection of notes, stories, and things worth remembering.
                        </p>
                    </header>
                </div>
            </section>

            {loading ? (
                <div className="text-center py-16 text-text-muted">Opening the diary...</div>
            ) : posts.length === 0 ? (
                <div className="text-center py-16 text-text-muted">
                    The first page is still waiting to be written. Check back soon.
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
