'use client';

import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import { getPlatform, cn, formatFileSize } from '@/lib/utils';
import { Upload, File, Smartphone, Laptop, CheckCircle, AlertCircle, Loader2, X, Package, CloudUpload, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadSection({ onClose }: { onClose?: () => void }) {
    const [platform, setPlatform] = useState<'windows' | 'android' | 'other'>('other');
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: '',
    });

    const [title, setTitle] = useState('');
    const [developer, setDeveloper] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('1');

    useEffect(() => {
        setPlatform(getPlatform());
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setStatus({ type: null, message: '' });
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            const ext = `.${droppedFile.name.split('.').pop()?.toLowerCase()}`;
            const allowedExt = platform === 'windows' ? '.exe' : '.apk';

            if (ext === allowedExt) {
                setFile(droppedFile);
                setStatus({ type: null, message: '' });
            } else {
                setStatus({ type: 'error', message: `Invalid file type. Please upload a ${allowedExt} file.` });
            }
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        setStatus({ type: null, message: '' });

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('developer', developer);
        formData.append('description', description);
        formData.append('category_id', categoryId);
        formData.append('platform', platform);

        try {
            await api.post('/apps/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setStatus({ type: 'success', message: 'App successfully published to store!' });
            setFile(null);
            setTitle('');
            setDeveloper('');
            setDescription('');

            // Close modal after success animation
            setTimeout(() => {
                if (onClose) onClose();
            }, 2000);
        } catch (error: any) {
            console.error('Upload failed:', error);
            setStatus({
                type: 'error',
                message: error.message || 'Upload failed. Please try again.'
            });
        } finally {
            setUploading(false);
        }
    };

    if (platform === 'other') return null;

    const isWindows = platform === 'windows';
    const allowedExt = isWindows ? '.exe' : '.apk';
    const platformLabel = isWindows ? 'Windows' : 'Android';

    return (
        <section className="relative w-full h-full flex flex-col md:flex-row overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl md:rounded-[2.5rem] shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
            {/* Left Panel - Visual & Dropzone */}
            <div className="w-full md:w-5/12 bg-gray-50 dark:bg-gray-800/50 p-6 md:p-10 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-600/10 rounded-xl">
                            <Package className="text-blue-600" size={24} />
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white tracking-tight">Xieriee Studio</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
                        Publish your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Masterpiece</span>
                    </h2>
                </div>

                <div
                    className={cn(
                        "flex-1 border-2 border-dashed rounded-3xl transition-all duration-300 relative group/drop overflow-hidden",
                        isDragging ? "border-blue-500 bg-blue-500/5 scale-[0.99] ring-4 ring-blue-500/10" : "border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-gray-50 dark:hover:bg-gray-800/80"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept={allowedExt}
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-transform duration-300 group-hover/drop:scale-105">
                        <AnimatePresence mode="wait">
                            {file ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-20 h-20 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20 mb-4">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 break-all px-4">
                                        {file.name}
                                    </h3>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-500 dark:text-gray-300 mt-2">
                                        {formatFileSize(file.size)}
                                    </span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className={cn(
                                        "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300",
                                        isDragging ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-700 text-blue-600 shadow-xl"
                                    )}>
                                        <CloudUpload size={40} className={isDragging ? "animate-bounce" : ""} />
                                    </div>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                        {isDragging ? 'Drop it here!' : 'Drag & Drop package'}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        or click to browse {allowedExt}
                                    </p>
                                    <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        {isWindows ? <Laptop size={14} /> : <Smartphone size={14} />}
                                        Detecting {platformLabel}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto relative">
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white z-20"
                    >
                        <X size={20} />
                    </button>
                )}

                <form onSubmit={handleUpload} className="space-y-6 max-w-lg mx-auto pt-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-1.5 ml-1">App Name</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Pixel Studio Pro"
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-1.5 ml-1">Developer</label>
                            <input
                                type="text"
                                required
                                value={developer}
                                onChange={(e) => setDeveloper(e.target.value)}
                                placeholder="Your Studio Name"
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-1.5 ml-1">Description</label>
                            <textarea
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Tell us what makes your app special..."
                                rows={4}
                                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium resize-none"
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={cn(
                                    "p-4 rounded-xl flex items-center gap-3 text-sm font-medium",
                                    status.type === 'success' ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300" : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                )}
                            >
                                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                {status.message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={!file || uploading}
                        className={cn(
                            "w-full py-4 rounded-xl font-bold text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2",
                            !file || uploading
                                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/25 transform hover:-translate-y-0.5 active:translate-y-0"
                        )}
                    >
                        {uploading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            <>
                                Publish to Store
                            </>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}
