import { supabase } from './client';
import { UploadedArtwork } from './storage';

export async function getArtwork(id: string): Promise<UploadedArtwork> {
  try {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Artwork not found');

    return data as UploadedArtwork;
  } catch (error) {
    console.error('Error fetching artwork:', error);
    throw error;
  }
}