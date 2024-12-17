import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Image } from 'lucide-react';
import { getRecentArtworks } from '../lib/supabase/queries/artwork';
import type { Artwork } from '../lib/supabase/types';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export function RecentUploads() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadRecentArtworks() {
      try {
        const recent = await getRecentArtworks();
        if (mounted) {
          setArtworks(recent);
        }
      } catch (error) {
        console.error('Failed to load artworks:', error);
        if (mounted) {
          toast.error('Failed to load recent uploads');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadRecentArtworks();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No artworks uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map((artwork) => (
        <Link
          key={artwork.id}
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
              {format(new Date(artwork.created_at), 'PPP')}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}