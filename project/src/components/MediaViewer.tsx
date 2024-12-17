import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MediaViewerProps {
  type: 'image' | 'video' | 'audio';
  url: string;
  title: string;
  className?: string;
}

export function MediaViewer({ type, url, title, className = '' }: MediaViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (type === 'image') {
    return (
      <div className="relative w-full h-full">
        <img
          src={url}
          alt={title}
          className={`w-full h-full object-cover ${className}`}
          loading="lazy"
        />
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div className="relative w-full h-full">
        <video
          src={url}
          className={`w-full h-full object-cover ${className}`}
          controls
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          muted={isMuted}
        />
      </div>
    );
  }

  if (type === 'audio') {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100 p-4">
        <div className="w-full">
          <audio
            src={url}
            className="w-full"
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      </div>
    );
  }

  return null;
}