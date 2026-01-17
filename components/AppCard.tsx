'use client';

import { Star, Download } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AppCardProps {
    id: number;
    title: string;
    icon: string | null;
    developer: string;
    rating: string;
    category?: string;
    downloads?: string;
}

export default function AppCard({ id, title, icon, developer, rating, category, downloads }: AppCardProps) {
    return (
        <Link href={`/app/${id}`} className="block group font-sans">
            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="space-y-3 cursor-pointer p-3 rounded-2xl transition-all hover:bg-white dark:hover:bg-gray-800/50 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/30"
            >
                <div className="relative aspect-square overflow-hidden rounded-[1.25rem] shadow-sm group-hover:shadow-md transition-all duration-300 bg-gray-100 dark:bg-gray-800">
                    <img
                        src={icon || 'https://via.placeholder.com/150'}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                    />
                    {category && (
                        <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                            {category}
                        </div>
                    )}
                </div>

                <div className="px-1 space-y-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm md:text-[15px] leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate font-medium">{developer}</p>

                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
                            <span>{rating}</span>
                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                        </div>
                        {downloads && <span className="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-md">{downloads}</span>}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
