import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SeverityBadge from './SeverityBadge';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category, onClick }) {
  const { language } = useLanguage();

  if (!category) return null;

  const name = language === 'hi' && category.nameHi ? category.nameHi : category.name;
  const description = language === 'hi' && category.descriptionHi ? category.descriptionHi : category.description;

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left w-full p-4 sm:p-5 rounded-2xl bg-white border border-surface-200 shadow-xs hover:shadow-md hover:border-surface-300 transition-all flex flex-col justify-between group active:scale-98"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-3xl sm:text-4xl p-2 rounded-xl bg-surface-50 group-hover:scale-110 transition-transform">
            {category.icon || '🆘'}
          </span>
          <SeverityBadge severity={category.severity} />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-surface-900 mb-1 group-hover:text-emergency-600 transition-colors">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-surface-500 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs font-bold text-surface-600 group-hover:text-emergency-600 mt-4 pt-3 border-t border-surface-100 w-full">
        <span>{language === 'hi' ? 'मार्गदर्शिका देखें' : 'View First Aid Guide'}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}
