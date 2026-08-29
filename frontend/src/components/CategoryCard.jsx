import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SeverityBadge from './SeverityBadge';

export default function CategoryCard({ category, onClick }) {
  const { language } = useLanguage();
  if (!category) return null;

  const hi = language === 'hi';
  const name = hi && category.nameHi ? category.nameHi : category.name;
  const description = hi && category.descriptionHi ? category.descriptionHi : category.description;

  return (
    <button type="button" onClick={onClick} className="category">
      <span className="category__icon" aria-hidden="true">{category.icon || '🆘'}</span>
      <span className="category__body">
        <span className="category__name">{name}</span>
        <span className="category__desc">{description}</span>
        <SeverityBadge severity={category.severity} />
      </span>
    </button>
  );
}
