import React from 'react';
import { Play, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function VideoCard({ video }) {
  const { language } = useLanguage();

  if (!video) return null;

  const title = language === 'hi' && video.titleHi ? video.titleHi : video.title;
  const description = language === 'hi' && video.descriptionHi ? video.descriptionHi : video.description;

  return (
    <div className="bg-white border border-surface-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-surface-100 text-surface-700">
            <ShieldCheck className="w-3.5 h-3.5 text-safe-600" />
            {video.source}
          </span>
          <span className="text-xs text-surface-500 font-medium">⏱️ {video.duration}</span>
        </div>

        <h4 className="text-base font-bold text-surface-900 mb-1 leading-snug">
          {title}
        </h4>
        <p className="text-xs text-surface-600 line-clamp-2 mb-4">
          {description}
        </p>
      </div>

      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-100 hover:bg-emergency-50 hover:text-emergency-700 text-surface-800 text-xs sm:text-sm font-bold transition-colors"
      >
        <Play className="w-4 h-4 fill-current text-emergency-600" />
        <span>{language === 'hi' ? 'निर्देश वीडियो देखें' : 'Watch Official Video'}</span>
        <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
      </a>
    </div>
  );
}
