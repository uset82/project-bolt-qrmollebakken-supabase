import { supabase } from '../supabase/client';
import { SUPABASE_CONFIG } from '../supabase/config';
import type { Artwork } from '../types';

export async function getRecentArtworks(limit = SUPABASE_CONFIG.DEFAULT_QUERY_LIMIT): Promise<Artwork[]> {
  try {
    const { data, error } = await supabase
      .from('artworks')
      .select()
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch recent artworks:', error);
    return [];
  }
}

export async function getArtwork(id: string): Promise<Artwork | null> {
  try {
    const { data, error } = await supabase
      .from('artworks')
      .select()
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch artwork:', error);
    return null;
  }
}