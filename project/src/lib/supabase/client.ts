import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://slgktqtfzyxwfukuctvn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZ2t0cXRmenl4d2Z1a3VjdHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNDMxNjUsImV4cCI6MjA0ODkxOTE2NX0.7lun2I23be6ib1qWinHce_YZ3VQwkcoEbAe40MhsxPw';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);