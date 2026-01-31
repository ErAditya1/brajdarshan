'use client';

import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORIES = ['All', 'Temple', 'Ghat', 'Forest'];
const SORT_OPTIONS = ['Popularity', 'Distance', 'Rating'];

export default function PlacesHeader({
  onCategoryChange,
  onSortChange,
}: {
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sort: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popularity');
  const [showSort, setShowSort] = useState(false);

  const handleCategory = (category: string) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  const handleSort = (option: string) => {
    setSortBy(option);
    setShowSort(false);
    onSortChange?.(option);
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
      {/* ================= Title ================= */}
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          Places in Braj
        </h1>
        <p className="text-muted-foreground mt-1">
          Explore temples, ghats, and sacred forests.
        </p>
      </div>

      {/* ================= Actions ================= */}
      <div className="flex flex-wrap gap-2 relative">
        {/* Filters (future drawer/modal) */}
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>

        {/* Sort Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setShowSort((v) => !v)}
          >
            Sort: {sortBy}
            <ChevronDown className="w-4 h-4" />
          </Button>

          {showSort && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg border bg-background shadow-lg z-20">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSort(option)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Pills */}
        <div className="hidden md:flex gap-2 ml-2">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;

            return (
              <Button
                key={category}
                size="sm"
                variant="ghost"
                onClick={() => handleCategory(category)}
                className={
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }
              >
                {category}
              </Button>
            );
          })}
        </div>
      </div>
    </header>
  );
}