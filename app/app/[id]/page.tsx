'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Star, Download, Share2, ShieldCheck, Info, ChevronLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface AppDetails {
    id: number;
    title: string;
    icon: string | null;
    developer: string;
    rating: string;
    downloads: string;
    description: string;
    screenshots: string[];
    category_name: string;
    download_url: string;
    platform: string;
}

export default function AppPage() {
    const { id } = useParams();
    const router = useRouter();
    const [app, setApp] = useState<AppDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [installing, setInstalling] = useState(false);
    const [installed, setInstalled] = useState(false);

    useEffect(() => {
        const fetchApp = async () => {
            try {
                const response = await axios.get(`${API_URL}/apps/${id}`);
                setApp(response.data);
            } catch (error) {
                console.error('Error fetching app details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchApp();
    }, [id]);

    const handleInstall = () => {
        if (!app?.download_url) return;

        setInstalling(true);

        // Start download after a small "preparation" delay to feel consistent with the store UI
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = app.download_url;
            // Extract filename from URL or default to title + extension
            const filename = app.download_url.split('/').pop() || `${app.title}.${app.platform === 'windows' ? 'exe' : 'apk'}`;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setInstalling(false);
            setInstalled(true);
        }, 1500);
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto py-12 px-4 animate-pulse space-y-12">
                <div className="flex gap-8 items-center">
                    <div className="w-40 h-40 bg-gray-200 dark:bg-gray-800 rounded-[2.5rem]"></div>
                    <div className="space-y-4 flex-1">
                        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                        <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-1/4"></div>
                        <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!app) return (
        <div className="flex flex-col items-center justify-center py-32 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">App not found</h2>
            <button onClick={() => router.back()} className="text-blue-600 font-bold hover:underline">Go back</button>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto pb-32 pt-4 px-4 sm:px-0"
        >
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors group"
            >
                <div className="p-1.5 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                    <ChevronLeft size={20} />
                </div>
                <span className="text-sm font-bold">Back</span>
            </button>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative shrink-0"
                >
                    <img
                        src={app.icon || 'https://via.placeholder.com/200'}
                        alt={app.title}
                        className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] shadow-2xl object-cover ring-1 ring-black/5"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <ShieldCheck size={24} className="text-blue-600" />
                    </div>
                </motion.div>

                <div className="flex-1 space-y-6 w-full">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                            {app.title}
                        </h1>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">{app.developer}</p>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">{app.category_name} • Contains ads</p>
                    </div>

                    <div className="flex items-center gap-12 py-6 border-y border-gray-100 dark:border-gray-800 overflow-x-auto scrollbar-hide">
                        <div className="space-y-1 shrink-0 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-1 font-black text-xl text-gray-900 dark:text-white">
                                <span>{app.rating}</span>
                                <Star size={16} fill="currentColor" className="text-gray-900 dark:text-white" />
                            </div>
                            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Rating</p>
                        </div>
                        <div className="w-[1px] h-10 bg-gray-100 dark:bg-gray-800 shrink-0"></div>
                        <div className="space-y-1 shrink-0 text-center md:text-left">
                            <span className="font-black text-xl text-gray-900 dark:text-white">{app.downloads || '1M+'}</span>
                            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Downloads</p>
                        </div>
                        <div className="w-[1px] h-10 bg-gray-100 dark:bg-gray-800 shrink-0"></div>
                        <div className="space-y-1 shrink-0 text-center md:text-left">
                            <div className="w-7 h-7 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded flex items-center justify-center text-[10px] font-black mx-auto md:mx-0">
                                PEGI 3
                            </div>
                            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Everyone</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleInstall}
                            disabled={installing || installed}
                            className={`flex-1 md:flex-none min-w-[200px] h-14 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${installed
                                ? 'bg-green-600 text-white cursor-default'
                                : installing
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 active:scale-95'
                                }`}
                        >
                            {installing ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Starting Download...
                                </>
                            ) : installed ? (
                                <>
                                    <CheckCircle2 size={20} />
                                    Ready to Open
                                </>
                            ) : (
                                `Download for ${app.platform === 'windows' ? 'Windows' : 'Android'}`
                            )}
                        </button>
                        <button className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-sm">
                            <Share2 size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Screenshots Carousel */}
            {app.screenshots && app.screenshots.length > 0 && (
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Gallery</h2>
                        <div className="flex items-center gap-4 text-gray-400">
                            <div className="w-8 h-1 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                            <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                            <div className="w-8 h-1 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide md:mx-0 -mx-4 px-4 md:px-0">
                        {app.screenshots.map((shot, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                className="shrink-0 snap-center"
                            >
                                <img
                                    src={shot}
                                    alt={`Screenshot ${idx + 1}`}
                                    className="h-[30rem] w-auto rounded-[2rem] shadow-2xl ring-1 ring-black/5 object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Description and Info */}
            <div className="grid md:grid-cols-3 gap-16">
                <div className="md:col-span-2 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">About this app</h2>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                                <Info size={20} className="text-gray-400" />
                            </button>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line text-lg font-medium">
                            {app.description || "No description available."}
                        </p>
                    </div>

                    <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 space-y-4">
                        <h3 className="font-black text-gray-900 dark:text-white">Safety & Privacy</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                            Safety starts with understanding how developers collect and share your data. Data privacy and security practices may vary based on your use, region, and age. The developer provided this information and may update it over time.
                        </p>
                        <button className="text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline">Learn more</button>
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">What's new</h2>
                    <div className="space-y-4">
                        <div className="p-5 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
                            <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">Version 4.2.0</p>
                            <p className="text-sm text-blue-700/70 dark:text-blue-400/70 font-medium">
                                • Stability improvements and bug fixes<br />
                                • Refreshed UI components<br />
                                • Performance optimizations
                            </p>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Updated on Jan 15, 2026</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
