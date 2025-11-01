import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { MessageCircle, Heart, Plus, Filter, ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import storyService from '../services/storyService';
import replyService from '../services/replyService';

export default function DindingCerita() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [expandedStory, setExpandedStory] = useState(null);
    const [replies, setReplies] = useState({});
    const [replyText, setReplyText] = useState('');
    const [replyAnonymous, setReplyAnonymous] = useState(true);
    const [replySortBy, setReplySortBy] = useState('newest');
    const toast = React.useRef(null);

    const [formData, setFormData] = useState({
        category: '',
        title: '',
        content: '',
        isAnonymous: true
    });

    const categories = [
        { label: 'Semua', value: 'all' },
        { label: 'Sekolah', value: 'school' },
        { label: 'Teman', value: 'friends' },
        { label: 'Keluarga', value: 'family' },
        { label: 'Diri Sendiri', value: 'self' },
        { label: 'Online', value: 'online' }
    ];

    const replySortOptions = [
        { label: 'Terbaru', value: 'newest' },
        { label: 'Terlama', value: 'oldest' },
        { label: 'Paling Disukai', value: 'most_upvoted' },
        { label: 'Paling Tidak Disukai', value: 'most_downvoted' }
    ];

    const postCategories = categories.filter(c => c.value !== 'all');

    useEffect(() => {
        loadStories();
    }, [selectedCategory, page]);

    useEffect(() => {
        if (expandedStory) {
            loadReplies(expandedStory);
        }
    }, [replySortBy]);

    const loadStories = async () => {
        try {
            setLoading(true);
            const response = await storyService.getAllStories(selectedCategory, page);
            setStories(response.data);
            setPagination(response.pagination);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Gagal memuat cerita',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const loadReplies = async (storyId) => {
        try {
            const response = await replyService.getReplies(storyId, replySortBy);
            setReplies(prev => ({
                ...prev,
                [storyId]: response.data
            }));
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Gagal memuat balasan',
                life: 3000
            });
        }
    };

    const handleSubmit = async () => {
        if (!formData.category || !formData.title || !formData.content) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Peringatan',
                detail: 'Semua field wajib diisi',
                life: 3000
            });
            return;
        }

        try {
            const response = await storyService.createStory(formData);
            toast.current?.show({
                severity: 'success',
                summary: 'Berhasil',
                detail: response.message,
                life: 3000
            });
            setShowDialog(false);
            setFormData({
                category: '',
                title: '',
                content: '',
                isAnonymous: true
            });
            loadStories();
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.error || 'Gagal membuat cerita',
                life: 3000
            });
        }
    };

    const handleSupport = async (storyId) => {
        try {
            const response = await storyService.toggleSupport(storyId);
            toast.current?.show({
                severity: 'success',
                summary: 'Berhasil',
                detail: response.message,
                life: 2000
            });
            loadStories();
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Gagal memberikan dukungan',
                life: 3000
            });
        }
    };

    const handleReplySubmit = async (storyId) => {
        if (!replyText.trim()) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Peringatan',
                detail: 'Balasan tidak boleh kosong',
                life: 3000
            });
            return;
        }

        try {
            const response = await replyService.createReply(storyId, {
                content: replyText,
                isAnonymous: replyAnonymous
            });
            toast.current?.show({
                severity: 'success',
                summary: 'Berhasil',
                detail: response.message,
                life: 2000
            });
            setReplyText('');
            loadReplies(storyId);
            loadStories();
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Gagal mengirim balasan',
                life: 3000
            });
        }
    };

    const handleVote = async (replyId, voteType, storyId) => {
        try {
            await replyService.toggleVote(replyId, voteType);
            loadReplies(storyId);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Gagal memberikan vote',
                life: 3000
            });
        }
    };

    const toggleReplies = (storyId) => {
        if (expandedStory === storyId) {
            setExpandedStory(null);
        } else {
            setExpandedStory(storyId);
            if (!replies[storyId]) {
                loadReplies(storyId);
            }
        }
    };

    const getCategoryLabel = (value) => {
        return categories.find(c => c.value === value)?.label || value;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getUserVote = (reply, userId) => {
        const vote = reply.votes?.find(v => v.userId === userId);
        return vote?.voteType;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <Toast ref={toast} />

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <MessageCircle size={32} className="text-green-500" />
                        Dinding Cerita
                    </h1>
                    <p className="text-gray-600 mt-1">Berbagi cerita, saling mendukung</p>
                </div>
                <Button
                    label="Bagikan Cerita"
                    icon={<Plus size={16} />}
                    onClick={() => setShowDialog(true)}
                    className="bg-green-500 hover:bg-green-600 border-0"
                />
            </div>

            {/* Filter */}
            <Card className="mb-4">
                <div className="flex items-center gap-2">
                    <Filter size={20} className="text-gray-600" />
                    <Dropdown
                        value={selectedCategory}
                        options={categories}
                        onChange={(e) => {
                            setSelectedCategory(e.value);
                            setPage(1);
                        }}
                        placeholder="Filter Kategori"
                        className="w-full md:w-64"
                    />
                </div>
            </Card>

            {/* Stories List */}
            {loading ? (
                <div className="text-center py-8">
                    <i className="pi pi-spin pi-spinner text-4xl text-green-500"></i>
                </div>
            ) : stories.length === 0 ? (
                <Card className="text-center py-8">
                    <MessageCircle size={64} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Belum ada cerita di kategori ini</p>
                </Card>
            ) : (
                <>
                    <div className="space-y-4">
                        {stories.map((story) => (
                            <Card key={story.id} className="hover:shadow-lg transition-shadow">
                                <div className="mb-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                            {getCategoryLabel(story.category)}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            {formatDate(story.createdAt)}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {story.title}
                                    </h3>
                                    <p className="text-gray-600 whitespace-pre-wrap">
                                        {story.content}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t">
                                    <span className="text-sm text-gray-500">
                                        {story.isAnonymous ? 'Anonim' : story.user.username}
                                    </span>
                                    <div className="flex gap-2">
                                        <Button
                                            label={`${story.supportCount}`}
                                            icon={<Heart size={16} className="mr-2" />}
                                            onClick={() => handleSupport(story.id)}
                                            className="p-button-text p-button-sm text-pink-500"
                                        />
                                        <Button
                                            label={`${story._count?.replies || 0} Balasan`}
                                            icon={<MessageCircle size={16} className="mr-2" />}
                                            onClick={() => toggleReplies(story.id)}
                                            className="p-button-text p-button-sm text-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Replies Section */}
                                {expandedStory === story.id && (
                                    <div className="mt-4 pt-4 border-t">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-semibold">Balasan</h4>
                                            <Dropdown
                                                value={replySortBy}
                                                options={replySortOptions}
                                                onChange={(e) => setReplySortBy(e.value)}
                                                className="w-48 text-sm"
                                            />
                                        </div>

                                        {/* Reply Form */}
                                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                            <InputTextarea
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder="Tulis balasan..."
                                                rows={3}
                                                className="w-full mb-2"
                                            />
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <Checkbox
                                                        inputId={`reply-anon-${story.id}`}
                                                        checked={replyAnonymous}
                                                        onChange={(e) => setReplyAnonymous(e.checked)}
                                                    />
                                                    <label htmlFor={`reply-anon-${story.id}`} className="text-sm">
                                                        Anonim
                                                    </label>
                                                </div>
                                                <Button
                                                    label="Kirim"
                                                    icon={<Send size={16} className="mr-2" />}
                                                    onClick={() => handleReplySubmit(story.id)}
                                                    className="bg-blue-500 hover:bg-blue-600 border-0 p-button-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Replies List */}
                                        <div className="space-y-3">
                                            {replies[story.id]?.map((reply) => (
                                                <div key={reply.id} className="p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-sm font-medium">
                                                            {reply.isAnonymous ? 'Anonim' : reply.user.username}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {formatDate(reply.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            icon={<ThumbsUp size={14} className="mr-2" />}
                                                            label={reply.upvoteCount.toString()}
                                                            onClick={() => handleVote(reply.id, 'upvote', story.id)}
                                                            className="p-button-text p-button-sm text-green-600"
                                                        />
                                                        <Button
                                                            icon={<ThumbsDown size={14} className="mr-2" />}
                                                            label={reply.downvoteCount.toString()}
                                                            onClick={() => handleVote(reply.id, 'downvote', story.id)}
                                                            className="p-button-text p-button-sm text-red-600"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-6">
                            <Button
                                icon="pi pi-chevron-left"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="p-button-outlined"
                            />
                            <span className="flex items-center px-4">
                                Halaman {page} dari {pagination.totalPages}
                            </span>
                            <Button
                                icon="pi pi-chevron-right"
                                disabled={page === pagination.totalPages}
                                onClick={() => setPage(page + 1)}
                                className="p-button-outlined"
                            />
                        </div>
                    )}
                </>
            )}

            {/* Create Story Dialog */}
            <Dialog
                header="Bagikan Ceritamu"
                visible={showDialog}
                style={{ width: '90vw', maxWidth: '600px' }}
                onHide={() => setShowDialog(false)}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Kategori *</label>
                        <Dropdown
                            value={formData.category}
                            options={postCategories}
                            onChange={(e) => setFormData({ ...formData, category: e.value })}
                            placeholder="Pilih Kategori"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Judul *</label>
                        <InputText
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Masukkan judul cerita..."
                            className="w-full"
                            maxLength={100}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Cerita *</label>
                        <InputTextarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Ceritakan pengalamanmu..."
                            rows={6}
                            className="w-full"
                            maxLength={1000}
                        />
                        <small className="text-gray-500">
                            {formData.content.length}/1000 karakter
                        </small>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            inputId="anonymous"
                            checked={formData.isAnonymous}
                            onChange={(e) => setFormData({ ...formData, isAnonymous: e.checked })}
                        />
                        <label htmlFor="anonymous" className="text-sm">
                            Posting sebagai Anonim
                        </label>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                            <strong>Catatan:</strong> Cerita yang mengandung konten sensitif akan ditinjau terlebih dahulu sebelum dipublikasikan.
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            label="Batal"
                            onClick={() => setShowDialog(false)}
                            className="p-button-text"
                        />
                        <Button
                            label="Bagikan"
                            onClick={handleSubmit}
                            className="bg-green-500 hover:bg-green-600 border-0"
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
