import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { FaBold, FaItalic, FaUnderline, FaHeading, FaQuoteRight, FaListUl, FaListOl, FaImage, FaUndo, FaRedo, FaAlignLeft, FaAlignCenter, FaAlignRight, FaSave, FaArrowLeft } from 'react-icons/fa';
import api from '../api/axios';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ImagePickerModal from '../components/ImagePickerModal';
import PrimaryButton from '../components/PrimaryButton';
import { getImageUrl } from '../utils/imageUrl';

const MenuBar = ({ editor, openImagePicker }) => {
    if (!editor) return null;

    const Button = ({ onClick, isActive, children, title }) => (
        <button
            onClick={onClick}
            className={`p-2 rounded-lg transition-all duration-200 ${isActive
                ? 'bg-primary/10 text-primary'
                : 'text-text-muted hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary'
                }`}
            title={title}
        >
            {children}
        </button>
    );

    const Divider = () => <div className="w-px h-6 bg-[rgba(255,255,255,0.06)] mx-1 self-center"></div>;

    return (
        <div className="flex flex-wrap gap-1 px-4 py-2 border-b border-[rgba(255,255,255,0.06)] bg-surface-alt sticky top-0 z-10 items-center rounded-t-xl">
            <Button onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold"><FaBold /></Button>
            <Button onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic"><FaItalic /></Button>
            <Button onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline"><FaUnderline /></Button>

            <Divider />

            <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="H1"><FaHeading className="text-xl" /></Button>
            <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="H2"><FaHeading className="text-sm" /></Button>

            <Divider />

            <Button onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left"><FaAlignLeft /></Button>
            <Button onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center"><FaAlignCenter /></Button>
            <Button onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right"><FaAlignRight /></Button>

            <Divider />

            <Button onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List"><FaListUl /></Button>
            <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Ordered List"><FaListOl /></Button>
            <Button onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Quote"><FaQuoteRight /></Button>

            <Divider />

            <button
                onClick={openImagePicker}
                className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200"
                title="Insert Image"
            >
                <FaImage />
            </button>

            <div className="flex-1"></div>

            <Button onClick={() => editor.chain().focus().undo().run()} title="Undo"><FaUndo /></Button>
            <Button onClick={() => editor.chain().focus().redo().run()} title="Redo"><FaRedo /></Button>
        </div>
    );
};

const PostEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [isDraft, setIsDraft] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
    const [pickerMode, setPickerMode] = useState('editor'); // 'editor' or 'featured'

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link,
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Start writing your story...' }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-lg prose-invert max-w-none focus:outline-none min-h-[600px] p-8 text-text-primary prose-headings:text-text-primary prose-p:text-text-primary prose-blockquote:border-accent prose-blockquote:text-text-muted prose-code:text-accent prose-code:bg-[rgba(242,239,234,0.03)] prose-code:rounded',
            },
        },
    });

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const { data } = await api.get(`/posts/${id}`);
                    setTitle(data.title);
                    setSlug(data.slug || '');
                    setFeaturedImage(data.featuredImage);
                    setIsDraft(data.isDraft || false);
                    if (editor) {
                        editor.commands.setContent(data.content);
                    }
                } catch (err) {
                    setError('Failed to load post');
                }
            };
            fetchPost();
        }
    }, [id, editor]);

    const handleImageSelect = (image) => {
        const fullUrl = getImageUrl(image.url);
        if (pickerMode === 'editor') {
            editor.chain().focus().setImage({ src: fullUrl }).run();
        } else {
            setFeaturedImage(image);
        }
    };

    const savePost = async (saveAsDraft = false) => {
        if (!title) {
            setError('Title is required');
            return;
        }

        setIsSaving(true);
        setError('');

        const content = editor.getHTML();
        const postData = {
            title,
            slug,
            content,
            featuredImage: featuredImage?._id,
            isDraft: saveAsDraft
        };

        console.log('Saving post with data:', { ...postData, isDraft: saveAsDraft });

        try {
            if (id) {
                await api.put(`/posts/${id}`, postData);
            } else {
                await api.post('/posts', postData);
            }
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save post');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
                {/* Header Actions - Sticky bar with distinct styling */}
                <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 mb-6 sm:mb-8 bg-surface-alt/95 backdrop-blur-md border border-[var(--border)] shadow-lg rounded-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Title Section - Hidden on mobile */}
                        <div className="hidden sm:flex items-center gap-3 sm:gap-4">
                            <RouterLink to="/admin" className="p-2 rounded-lg hover:bg-surface text-text-muted transition-colors flex-shrink-0">
                                <FaArrowLeft />
                            </RouterLink>
                            <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
                                {id ? 'Edit Post' : 'Create New Post'}
                            </h1>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => savePost(true)}
                                disabled={isSaving}
                                className="flex-1 sm:flex-initial px-4 py-2.5 sm:py-2 rounded-xl bg-surface hover:bg-surface-alt text-text-primary border border-[var(--border)] font-medium transition-all disabled:opacity-50 text-sm sm:text-base shadow-sm hover:shadow-md"
                            >
                                {isSaving ? 'Saving...' : 'Save Draft'}
                            </button>
                            <PrimaryButton
                                onClick={() => savePost(false)}
                                disabled={isSaving}
                                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-sm sm:text-base py-2.5 sm:py-2"
                            >
                                {isSaving ? 'Publishing...' : <><FaSave /> Publish</>}
                            </PrimaryButton>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-danger/10 text-danger px-4 py-3 rounded-xl mb-6 border border-danger/20">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Editor Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <input
                            type="text"
                            placeholder="Write a captivating title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-4xl font-bold bg-transparent border-none outline-none placeholder:text-text-muted/40 text-text-primary tracking-wide focus:bg-[rgba(255,255,255,0.02)] rounded-xl p-2 transition-colors"
                        />

                        <div className="bg-surface-alt rounded-2xl border border-[rgba(255,255,255,0.05)] shadow-[0_0_40px_rgba(215,191,162,0.05)] overflow-hidden">
                            <MenuBar editor={editor} openImagePicker={() => { setPickerMode('editor'); setIsImagePickerOpen(true); }} />
                            <EditorContent editor={editor} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-surface-alt p-6 space-y-6 rounded-2xl shadow-soft-sm border border-[rgba(255,255,255,0.06)]">
                            <h3 className="font-semibold text-text-primary pb-4 border-b border-[rgba(255,255,255,0.06)]">Post Settings</h3>

                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-2">URL Slug</label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="w-full bg-background border border-[rgba(255,255,255,0.06)] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-[var(--focus-ring)] text-text-primary"
                                    placeholder="my-awesome-post"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-2">Featured Image</label>
                                {featuredImage ? (
                                    <div className="relative group rounded-xl overflow-hidden shadow-sm aspect-video">
                                        <img
                                            src={getImageUrl(featuredImage.url)}
                                            alt="Featured"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                                        <button
                                            onClick={() => setFeaturedImage(null)}
                                            className="absolute top-2 right-2 bg-surface text-danger p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:scale-105"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => { setPickerMode('featured'); setIsImagePickerOpen(true); }}
                                        className="w-full aspect-video border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-xl flex flex-col items-center justify-center text-text-muted hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all group"
                                    >
                                        <FaImage className="text-2xl mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-medium">Select Image</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <ImagePickerModal
                    isOpen={isImagePickerOpen}
                    onClose={() => setIsImagePickerOpen(false)}
                    onSelect={handleImageSelect}
                />
            </div >
        </AdminLayout >
    );
};

export default PostEditor;
