'use client';

import React, { useState } from 'react';
import { Search, LogOut, Package, Settings, ChevronDown, Moon, Sun, Bell, Menu } from 'lucide-react';
import Link from 'next/link';
import UploadSection from './UploadSection';
import { UserButton, useUser } from "@stackframe/stack";

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const user = useUser();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            window.location.href = `/?search=${encodeURIComponent(searchTerm)}`;
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50 flex items-center justify-between px-4 md:px-8 transition-all duration-300 shadow-sm">
            {/* Logo Section */}
            <div className="flex items-center gap-4 md:w-64">
                <button className="md:hidden p-2 text-gray-600 dark:text-gray-300">
                    <Menu size={24} />
                </button>
                <Link href="/" className="flex items-center gap-3 group shrink-0">
                    <img src="/logo.svg" alt="Xieriee Store" className="w-8 h-8 md:w-9 md:h-9 hover:opacity-90 transition-opacity" />
                    <span className="text-xl text-gray-800 dark:text-gray-100 font-semibold tracking-tight hidden md:block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Xieriee Store</span>
                </Link>
            </div>

            {/* Search Bar - Center */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative mx-4">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for apps & games"
                        className="w-full bg-gray-100 dark:bg-gray-800 h-12 rounded-full pl-12 pr-4 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:shadow-[0_1px_6px_rgba(32,33,36,0.28)] transition-all text-base text-gray-700 dark:text-gray-200 placeholder:text-gray-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />

                    {/* Search Suggestions */}
                    {showSuggestions && searchTerm.length > 0 && (
                        <div className="absolute top-14 left-0 right-0 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
                            {[searchTerm, 'WhatsApp', 'Instagram', 'TikTok', 'Spotify'].map((item, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onMouseDown={() => {
                                        setSearchTerm(item);
                                        window.location.href = `/?search=${encodeURIComponent(item)}`;
                                    }}
                                    className="w-full flex items-center gap-4 px-6 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                                >
                                    <Search size={18} className="text-gray-400" />
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
                <button
                    onClick={toggleDarkMode}
                    className="p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden md:block"
                >
                    {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>

                {user ? (
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors font-medium text-sm"
                        >
                            <Package size={16} />
                            <span>Publish</span>
                        </button>
                        <UserButton />
                    </div>
                ) : (
                    <Link
                        href="/handler/sign-in"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors shadow-sm"
                    >
                        Sign in
                    </Link>
                )}
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setShowUploadModal(false)} />
                    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 rounded-3xl shadow-2xl bg-white dark:bg-gray-900">
                        <UploadSection onClose={() => setShowUploadModal(false)} />
                    </div>
                </div>
            )}
        </nav>
    );
}
