import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getAllOfflineCategories } from '../data/offlineFirstAid';
import CategoryCard from '../components/CategoryCard';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { BookOpen, Search, Filter, ShieldCheck } from 'lucide-react';

export default function FirstAidLibraryPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // all | critical | urgent

  const allCategories = getAllOfflineCategories();

  const filteredCategories = allCategories.filter((cat) => {
    const nameMatch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cat.nameHi && cat.nameHi.includes(searchQuery)) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!nameMatch) return false;

    if (selectedFilter === 'critical') return cat.severity === 'critical';
    if (selectedFilter === 'urgent') return cat.severity === 'urgent';
    return true;
  });

  const handleSelectCategory = (catId) => {
    navigate(`/first-aid/${catId}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-100 text-surface-800 text-xs font-extrabold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-emergency-600" />
              {t('library.offlineAvailable')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 leading-tight">
              {t('library.title')}
            </h1>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              {t('library.subtitle')}
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-surface-100">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-surface-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('library.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 text-sm font-medium focus:border-emergency-500 focus:ring-0"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-surface-50 p-1 rounded-xl border border-surface-200">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                selectedFilter === 'all'
                  ? 'bg-white text-surface-900 shadow-xs'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              {language === 'hi' ? 'सभी' : 'All'} ({allCategories.length})
            </button>
            <button
              onClick={() => setSelectedFilter('critical')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                selectedFilter === 'critical'
                  ? 'bg-emergency-600 text-white shadow-xs'
                  : 'text-emergency-700 hover:bg-white'
              }`}
            >
              🔴 {language === 'hi' ? 'गंभीर' : 'Critical'}
            </button>
            <button
              onClick={() => setSelectedFilter('urgent')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                selectedFilter === 'urgent'
                  ? 'bg-urgent-500 text-white shadow-xs'
                  : 'text-urgent-700 hover:bg-white'
              }`}
            >
              🟠 {language === 'hi' ? 'अत्यावश्यक' : 'Urgent'}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredCategories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onClick={() => handleSelectCategory(cat.id)}
          />
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-surface-200">
          <p className="text-base font-bold text-surface-700">No matching emergency categories found.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
            className="mt-2 text-xs font-bold text-emergency-600 hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}

      <SafetyDisclaimer />
    </div>
  );
}
