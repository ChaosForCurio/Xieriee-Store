'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import AppCard from '@/components/AppCard';
import HeroCarousel from '@/components/HeroCarousel';
import AppSection from '@/components/AppSection';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Skeleton Loader Component
const AppCardSkeleton = () => (
  <div className="p-3 space-y-4 animate-pulse flex-shrink-0 w-[140px] md:w-[180px]">
    <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-3xl"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
    </div>
  </div>
);

export default function Home() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchQuery(params.get('search') || '');
    setFilter(params.get('filter') || params.get('category') || '');

    const fetchApps = async () => {
      try {
        const res = await axios.get(`${API_URL}/apps`);
        setApps(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  // Filter logic for Search results page
  const filteredApps = apps.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase());
    // For specific filters like 'trending', we might want to sort instead of filter if we had real data.
    // For now, if filter is a category name, filter by it. If it's a 'type' (trending), just show all for demo or filter if backend supported it.
    // Keeping simple category match:
    const matchesFilter = filter && filter !== 'trending' && filter !== 'new_releases' && filter !== 'editors_choice' ? app.category === filter : true;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="space-y-8 overflow-hidden">
        <div className="h-[200px] md:h-[300px] w-full bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse -mx-4 md:mx-0" />
        <div className="flex gap-4 overflow-hidden px-2">
          {[...Array(6)].map((_, i) => <AppCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  // If search or filter active AND it's a search/category drilldown (not just 'trending' link), show grid
  // Actually, let's show grid for everything that has a query param for consistency with "See all" behavior
  if (searchQuery || filter) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="px-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {searchQuery ? `Results for "${searchQuery}"` : (filter === 'trending' ? 'Top Charts' : filter.replace('_', ' '))}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{filteredApps.length} results found</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-6">
          {filteredApps.map(app => (
            <AppCard key={app.id} {...app} />
          ))}
        </div>
      </div>
    );
  }

  // Store Home Layout
  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-20">
      {/* Hero Section */}
      <HeroCarousel apps={apps} />

      {/* Recommended Section */}
      <AppSection
        title="Recommended for you"
        apps={apps.slice(0, 8)}
      />

      {/* New & Updated */}
      <AppSection
        title="New & updated games"
        apps={apps.slice(2, 10)}
        link="/?filter=new_releases"
      />

      {/* Suggested */}
      <AppSection
        title="Suggested for you"
        apps={apps.slice(5, 15)}
      />

      {/* Top Rated */}
      <AppSection
        title="Top rated apps"
        apps={apps.slice(0, 10).reverse()}
        link="/?filter=editors_choice"
      />
    </div>
  );
}
