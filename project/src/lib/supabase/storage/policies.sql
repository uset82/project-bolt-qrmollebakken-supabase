-- Drop existing policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Insert Access" ON storage.objects;

-- Create new storage policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'artworks');

CREATE POLICY "Insert Access"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'artworks');

-- Update bucket settings
UPDATE storage.buckets
SET public = true
WHERE id = 'artworks';

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Update table policies
CREATE POLICY "Public artworks are viewable by everyone"
ON public.artworks FOR SELECT
TO public
USING (true);

CREATE POLICY "Anyone can insert artworks"
ON public.artworks FOR INSERT
TO public
WITH CHECK (true);