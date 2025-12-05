import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import AdminLayout from '../layouts/AdminLayout';
import { FaEdit, FaTrash, FaEye, FaFileAlt, FaImages, FaPen, FaPlus } from 'react-icons/fa';
import { format } from 'date-fns';
import { getImageUrl } from '../utils/imageUrl';

const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsRes, imagesRes] = await Promise.all([
                    api.get('/posts'),
                    api.get('/images')
                ]);
                setPosts(postsRes.data);
                setImages(imagesRes.data);
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        try {
            await api.delete(`/posts/${id}`);
            setPosts(posts.filter(p => p._id !== id));
        } catch (err) {
            alert('Failed to delete post');
        }
    };

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <div className="bg-surface p-4 sm:p-6 rounded-2xl shadow-soft-sm border border-[rgba(242,239,234,0.03)] flex items-center gap-3 sm:gap-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-[var(--bg)] text-lg sm:text-xl ${color}`}>
                <Icon />
            </div>
            <div>
                <p className="text-text-muted text-xs sm:text-sm font-medium">{label}</p>
                <p className="text-xl sm:text-2xl font-bold text-text-primary">{value}</p>
            </div>
        </div>
    );

    // Mobile Card View Component
    const PostCard = ({ post }) => (
        <div className="bg-surface rounded-xl p-4 border border-[rgba(242,239,234,0.03)] hover:border-primary/20 transition-all">
            <div className="flex gap-3 mb-3">
                {post.featuredImage && (
                    <img
                        src={getImageUrl(post.featuredImage.url)}
                        alt=""
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shadow-sm flex-shrink-0"
                    />
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                        <h3 className="text-sm sm:text-base font-semibold text-text-primary line-clamp-2 flex-1">
                            {post.title}
                        </h3>
                        {post.isDraft && (
                            <span className="px-2 py-0.5 bg-highlight/20 text-highlight text-xs rounded-md font-medium whitespace-nowrap">
                                Draft
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-text-muted truncate mb-1">{post.slug}</p>
                    <p className="text-xs text-text-muted">
                        {format(new Date(post.createdAt), 'MMM d, yyyy')}
                    </p>
                </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-[rgba(242,239,234,0.06)]">
                <Link
                    to={`/post/${post._id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-surface-alt rounded-lg text-xs sm:text-sm text-text-muted hover:text-primary hover:bg-primary/10 transition-all"
                >
                    <FaEye /> <span>View</span>
                </Link>
                <Link
                    to={`/admin/edit/${post._id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-surface-alt rounded-lg text-xs sm:text-sm text-text-muted hover:text-accent hover:bg-accent/10 transition-all"
                >
                    <FaEdit /> <span>Edit</span>
                </Link>
                <button
                    onClick={() => handleDelete(post._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-surface-alt rounded-lg text-xs sm:text-sm text-text-muted hover:text-danger hover:bg-danger/10 transition-all"
                >
                    <FaTrash /> <span>Delete</span>
                </button>
            </div>
        </div>
    );

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
                <StatCard icon={FaFileAlt} label="Total Posts" value={posts.length} color="bg-primary" />
                <StatCard icon={FaImages} label="Total Images" value={images.length} color="bg-accent" />
                <StatCard icon={FaPen} label="Drafts" value={posts.filter(p => p.isDraft).length} color="bg-highlight" />
            </div>

            {/* Quick Actions */}


            {/* Posts List - Desktop Table */}
            <div className="hidden md:block bg-surface rounded-2xl shadow-soft-sm border border-[rgba(242,239,234,0.03)] overflow-hidden">
                <div className="px-6 py-5 border-b border-[rgba(242,239,234,0.03)] flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-text-primary">Recent Posts</h2>
                    <span className="text-xs text-text-muted">{posts.length} total</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[rgba(242,239,234,0.03)]">
                        <thead className="bg-background">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Post</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-text-muted uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgba(242,239,234,0.03)]">
                            {posts.map((post) => (
                                <tr key={post._id} className="hover:bg-surface-alt transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {post.featuredImage && (
                                                <img
                                                    src={getImageUrl(post.featuredImage.url)}
                                                    alt=""
                                                    className="h-12 w-12 rounded-lg object-cover shadow-sm flex-shrink-0"
                                                />
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="text-sm font-semibold text-text-primary truncate">{post.title}</div>
                                                    {post.isDraft && (
                                                        <span className="px-2 py-0.5 bg-highlight/20 text-highlight text-xs rounded-md font-medium whitespace-nowrap">
                                                            Draft
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-text-muted truncate">{post.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                                        {format(new Date(post.createdAt), 'MMM d, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <Link to={`/post/${post._id}`} className="text-text-muted hover:text-primary transition-colors p-2 inline-block" title="View">
                                            <FaEye size={16} />
                                        </Link>
                                        <Link to={`/admin/edit/${post._id}`} className="text-text-muted hover:text-accent transition-colors p-2 inline-block" title="Edit">
                                            <FaEdit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(post._id)} className="text-text-muted hover:text-danger transition-colors p-2 inline-block" title="Delete">
                                            <FaTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Posts List - Mobile Cards */}
            <div className="md:hidden space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-text-primary">Recent Posts</h2>
                    <span className="text-xs text-text-muted">{posts.length} total</span>
                </div>
                {posts.length === 0 ? (
                    <div className="text-center py-12 text-text-muted">
                        <p>No posts yet. Create your first one!</p>
                    </div>
                ) : (
                    posts.map((post) => <PostCard key={post._id} post={post} />)
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
