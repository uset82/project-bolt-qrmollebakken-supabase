import { supabase } from './client';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_BUCKET = 'artworks';

interface UploadMetadata {
  title: string;
  student_id: string;
  student_name: string;
}

export interface UploadedArtwork {
  id: string;
  created_at: string;
  title: string;
  url: string;
  file_path: string;
  type: string;
  student_id: string;
  student_name: string;
}

export async function uploadArtwork(file: File, metadata: UploadMetadata): Promise<UploadedArtwork> {
  try {
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${metadata.student_id}/${fileName}`;

    // Upload file to storage
    const { error: uploadError, data } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw uploadError;
    }

    if (!data?.path) {
      throw new Error('No file path returned from storage upload');
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(STORAGE_BUCKET)
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
      console.error('Database insert error:', insertError);
      // Clean up the uploaded file
      await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([data.path]);
      throw insertError;
    }

    if (!artwork) {
      throw new Error('No artwork data returned from database');
    }

    return artwork;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

export async function getRecentArtworks(limit = 12): Promise<UploadedArtwork[]> {
  const { data, error } = await supabase
    .from('artworks')
    .select()
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Failed to fetch recent artworks:', error);
    throw error;
  }

  return data || [];
}