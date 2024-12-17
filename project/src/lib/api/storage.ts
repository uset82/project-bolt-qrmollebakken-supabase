import { supabase } from '../supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { SUPABASE_CONFIG } from '../supabase/config';
import type { Artwork } from '../supabase/types';

interface UploadMetadata {
  title: string;
  student_id: string;
  student_name: string;
}

export async function uploadArtwork(file: File, metadata: UploadMetadata): Promise<Artwork> {
  try {
    // Generate unique file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${metadata.student_id}/${fileName}`;

    // Upload file to storage
    const { error: uploadError, data } = await supabase.storage
      .from(SUPABASE_CONFIG.STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;
    if (!data?.path) throw new Error('No file path returned from storage upload');

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(SUPABASE_CONFIG.STORAGE_BUCKET)
      .getPublicUrl(data.path);

    // Create artwork record
    const { data: artwork, error: insertError } = await supabase
      .from('artworks')
      .insert({
        title: metadata.title,
        url: publicUrl,
        file_path: data.path,
        type: 'image',
        student_id: metadata.student_id,
        student_name: metadata.student_name
      })
      .select()
      .single();

    if (insertError) {
      // Clean up uploaded file on error
      await supabase.storage
        .from(SUPABASE_CONFIG.STORAGE_BUCKET)
        .remove([data.path]);
      throw insertError;
    }

    if (!artwork) throw new Error('No artwork data returned from database');
    return artwork;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}