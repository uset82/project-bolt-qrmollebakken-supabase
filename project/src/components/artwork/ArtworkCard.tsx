import { Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Artwork } from '../../lib/types';
import { formatDate } from '../../lib/utils/format';

interface ArtworkCardProps {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <Link
      to={`/artwork/${artwork.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        {artwork.url ? (
          <img
            src={artwork.url}
            alt={artwork.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{artwork.title}</h3>
        <p className="text-sm text-gray-500 mt-1">By {artwork.student_name}</p>
        <p className="text-xs text-gray-400 mt-2">
          {formatDate(artwork.created_at)}
        </p>
      </div>
    </Link>
  );
}