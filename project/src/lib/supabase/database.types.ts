export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      artworks: {
        Row: {
          id: string
          created_at: string
          title: string
          url: string
          file_path: string
          type: string
          student_id: string
          student_name: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          url: string
          file_path: string
          type?: string
          student_id: string
          student_name: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          url?: string
          file_path?: string
          type?: string
          student_id?: string
          student_name?: string
        }
      }
      students: {
        Row: {
          id: string
          created_at: string
          name: string
          folder_name: string
          grade: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          folder_name: string
          grade: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          folder_name?: string
          grade?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}