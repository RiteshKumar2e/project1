import React from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function VideoCard({ video }) {
  const { language } = useLanguage();
  if (!video) return null;

  const title = language === 'hi' && video.titleHi ? video.titleHi : video.title;

  return (
    <a href={video.url} target="_blank" rel="noopener noreferrer" className="video">
      <span className="video__play" aria-hidden="true">
        <Play size={20} fill="currentColor" />
      </span>

      <span className="video__body">
        <span className="video__title">{title}</span>
        <span className="video__meta">{video.source} &middot; {video.duration}</span>
      </span>

      <ExternalLink size={16} />
    </a>
  );
}
