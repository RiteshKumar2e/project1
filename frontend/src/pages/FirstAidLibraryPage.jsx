import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getAllOfflineCategories } from '../data/offlineFirstAid';
import CategoryCard from '../components/CategoryCard';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { Search } from 'lucide-react';
import '../styles/FirstAidLibraryPage.css';

export default function FirstAidLibraryPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const hi = language === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const allCategories = getAllOfflineCategories();

  const filteredCategories = allCategories.filter((cat) => {
    const q = searchQuery.toLowerCase();
    const nameMatch =
      cat.name.toLowerCase().includes(q) ||
      (cat.nameHi && cat.nameHi.includes(searchQuery)) ||
      cat.description.toLowerCase().includes(q);

    if (!nameMatch) return false;
    if (selectedFilter === 'all') return true;
    return cat.severity === selectedFilter;
  });

  const filters = [
    { id: 'all', label: `${hi ? 'सभी' : 'All'} (${allCategories.length})`, cls: '' },
    { id: 'critical', label: hi ? 'गंभीर' : 'Critical', cls: 'library__filter--critical' },
    { id: 'urgent', label: hi ? 'ज़रूरी' : 'Urgent', cls: 'library__filter--urgent' }
  ];

  return (
    <div className="page page--wide stack">
      <div>
        <h1>{t('library.title')}</h1>
        <p className="input__hint">
          {hi
            ? 'शांति से पढ़ लें — ज़रूरत पड़ने पर याद रहेगा। ये सब बिना इंटरनेट भी खुलता है।'
            : 'Read these before you need them. All of it works without internet.'}
        </p>
      </div>

      <div className="library__tools">
        <div className="library__search">
          <Search />
          <input
            type="search"
            className="field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={hi ? 'खोजें...' : 'Search...'}
          />
        </div>

        <div className="library__filters">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`library__filter ${f.cls}`}
              aria-pressed={selectedFilter === f.id}
              onClick={() => setSelectedFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filteredCategories.length > 0 ? (
        <div className="library__grid">
          {filteredCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onClick={() => navigate(`/first-aid/${cat.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="library__empty">
          <p>{hi ? 'कुछ नहीं मिला।' : 'Nothing matched that.'}</p>
          <button
            className="btn btn--outline"
            onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
          >
            {hi ? 'खोज हटाएँ' : 'Clear search'}
          </button>
        </div>
      )}

      <SafetyDisclaimer />
    </div>
  );
}
