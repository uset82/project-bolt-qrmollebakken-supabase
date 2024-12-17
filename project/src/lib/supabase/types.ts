export interface User {
  id: string;
  email: string;
  role: 'parent' | 'teacher';
  metadata?: {
    parent_id?: string;
    student_id?: string;
  };
}

export interface Student {
  id: string;
  created_at: string;
  name: string;
  folder_name: string;
  grade: string;
}

export interface Artwork {
  id: string;
  created_at: string;
  title: string;
  url: string;
  file_path: string;
  type: string;
  student_id: string;
  student_name: string;
}