'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, Download } from 'lucide-react';
import Link from 'next/link';

export default function HeroCarousel({ apps }: { apps: any[] }) {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

    // If no apps, show skeletons or nothing
    if (!apps || apps.length === 0) return null;

    // Use top 3-5 apps for hero
    const heroApps = apps.slice(0, 5);

    return (
        <div className="overflow-hidden rounded-3xl mb-10 -mx-4 md:mx-0 shadow-2xl shadow-blue-900/20" ref={emblaRef}>
            <div className="flex">
                {heroApps.map((app, index) => (
                    <div className="flex-[0_0_100%] min-w-0 relative px-2 md:px-0" key={app.id || index}>
                        <Link href={`/app/${app.id}`}>
                            <div className="relative h-[220px] md:h-[380px] w-full rounded-3xl overflow-hidden group border border-white/10">
                                {/* Dynamic Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105`} />

                                {/* Abstract Shapes/Pattern Overlay (Simulated) */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center gap-6">
                                        <div className="relative">
                                            <img
                                                src={app.icon_url || `https://ui-avatars.com/api/?name=${app.title}&background=random`}
                                                alt={app.title}
                                                className="w-16 h-16 md:w-24 md:h-24 rounded-2xl shadow-2xl bg-white object-cover ring-4 ring-white/10"
                                            />
                                            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white shadow-sm">
                                                FEATURED
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <h2 className="text-2xl md:text-4xl font-black tracking-tight drop-shadow-md">{app.title}</h2>
                                            <p className="text-sm md:text-lg text-gray-200 line-clamp-1 font-medium opacity-90">{app.description}</p>

                                            <div className="flex items-center gap-3 mt-3">
                                                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                                                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                    <span className="text-xs md:text-sm font-bold">{app.rating || '4.5'}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs md:text-sm font-medium">
                                                    {app.category_name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md rounded-full border border-white/30 group-hover:bg-white group-hover:text-blue-600 transition-all duration-300">
                                        <Download size={24} className="-ml-0.5" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

function getGradient(index: number) {
    const gradients = [
        'from-blue-600 to-indigo-600',
        'from-purple-600 to-pink-600',
        'from-emerald-500 to-teal-600',
        'from-orange-500 to-red-600',
    ];
    return gradients[index % gradients.length];
}
