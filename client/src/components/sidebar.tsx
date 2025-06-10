import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import type { Category } from "@shared/schema";

interface SidebarProps {
  categories: Category[];
  currentCategorySlug: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    pricing: string;
    hasApi: boolean;
    isFree: boolean;
    isPremium: boolean;
  };
  onFilterChange: (filters: any) => void;
}

export default function Sidebar({
  categories,
  currentCategorySlug,
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange
}: SidebarProps) {
  const [location, setLocation] = useLocation();

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleFilterChange = (key: string, value: boolean | string) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const getCategoryPath = (slug: string) => {
    return slug === 'social-media' ? '/' : `/category/${slug}`;
  };

  return (
    <aside className="lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Search Section */}
        <div className="p-6 border-b border-slate-200">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search OSINT tools..."
              value={searchQuery}
              onChange={handleSearchInput}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          </div>
        </div>

        {/* Categories */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Categories</h3>
          <nav className="space-y-1">
            {categories.map((category) => {
              const isActive = category.slug === currentCategorySlug;
              return (
                <Link
                  key={category.id}
                  href={getCategoryPath(category.slug)}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <i className={`${category.icon} w-5 mr-3`}></i>
                  <span className="flex-1">{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    187
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
