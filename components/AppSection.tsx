'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AppCard from './AppCard';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface AppSectionProps {
    title: string;
    apps: any[];
    link?: string;
}

export default function AppSection({ title, apps, link }: AppSectionProps) {
    const [emblaRef] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    });

    return (
        <section className="py-4">
            <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
                {link && (
                    <Link href={link} className="p-2 -mr-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
                        <ChevronRight size={24} />
                    </Link>
                )}
            </div>

            <div className="overflow-visible" ref={emblaRef}>
                <div className="flex gap-4 px-2">
                    {apps.map((app) => (
                        <div className="flex-[0_0_140px] md:flex-[0_0_180px] min-w-0" key={app.id}>
                            <AppCard {...app} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
