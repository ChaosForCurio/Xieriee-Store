'use client';

import Link from 'next/link';
import { Gamepad2, LayoutGrid, Clapperboard, BookOpen, Baby, TrendingUp, Award, Clock } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category');
    const currentFilter = searchParams.get('filter');

    const primaryLinks = [
        { name: 'Games', icon: Gamepad2, href: '/?category=Games' },
        { name: 'Apps', icon: LayoutGrid, href: '/?category=Apps' },
        { name: 'Movies & TV', icon: Clapperboard, href: '/?category=Movies' },
        { name: 'Books', icon: BookOpen, href: '/?category=Books' },
        { name: 'Kids', icon: Baby, href: '/?category=Kids' },
    ];

    const discoveryLinks = [
        { name: 'Top Charts', icon: TrendingUp, href: '/?filter=trending', id: 'trending' },
        { name: 'Editors’ Choice', icon: Award, href: '/?filter=editors_choice', id: 'editors_choice' },
        { name: 'New Releases', icon: Clock, href: '/?filter=new_releases', id: 'new_releases' },
    ];

    const renderLink = (link: any, isPrimary = true) => {
        // Determine active state:
        // For primary links: if query param category matches
        // For discovery links: if query param filter matches
        let isActive = false;
        if (isPrimary) {
            isActive = currentCategory === link.name || (pathname === '/' && !currentCategory && !currentFilter && link.name === 'Games'); // Default to Games if nothing active? Or maybe Apps. Let's just strict match.
        } else {
            isActive = currentFilter === link.id;
        }

        const Icon = link.icon;

        return (
            <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col md:flex-row items-center md:gap-4 px-2 md:px-6 py-2 md:py-3 mx-2 md:mx-0 rounded-full md:rounded-r-full md:rounded-l-none transition-all group ${isActive
                    ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
            >
                <Icon size={24} className={`${isActive ? 'fill-current' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] md:text-sm font-medium mt-1 md:mt-0">{link.name}</span>
            </Link>
        );
    };

    return (
        <>
            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800 rounded-2xl shadow-2xl z-50 flex justify-between items-center px-6">
                {primaryLinks.slice(0, 5).map(link => renderLink(link, true))}
            </div>

            {/* Desktop Sidebar */}
            <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-950 overflow-y-auto hidden md:flex flex-col py-4 border-r border-gray-100 dark:border-gray-800 z-40">
                <nav className="space-y-6 flex-1">
                    <div>
                        <div className="space-y-1 pr-3">
                            {primaryLinks.map(link => renderLink(link, true))}
                        </div>
                    </div>

                    <div className="h-px bg-gray-200 dark:bg-gray-800 mx-6" />

                    <div>
                        <div className="px-6 mb-2">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Discover</p>
                        </div>
                        <div className="space-y-1 pr-3">
                            {discoveryLinks.map(link => renderLink(link, false))}
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}
