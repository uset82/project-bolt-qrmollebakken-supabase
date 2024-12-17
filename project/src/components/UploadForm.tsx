import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { students } from '../lib/students';
import { uploadArtwork } from '../lib/supabase/storage/artwork';
import { ERROR_MESSAGES } from '../lib/supabase/config';
import toast from 'react-hot-toast';

interface UploadFormProps {
  onUploadComplete: () => void;
}

export function UploadForm({ onUploadComplete }: UploadFormProps) {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedStudent || !title.trim()) {
      toast.error('Please fill in all required fields and select a file');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const student = students.find(s => s.id === selectedStudent);
      if (!student) throw new Error('Student not found');

      // Start progress animation
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      await uploadArtwork(file, {
        title: title.trim(),
        student_id: selectedStudent,
        student_name: student.name
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      toast.success('Upload completed successfully!');
      onUploadComplete();

      // Reset form
      setTitle('');
      setSelectedStudent('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(ERROR_MESSAGES.STORAGE.UPLOAD_FAILED);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Artwork</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="student" className="block text-sm font-medium text-gray-700 mb-2">
            Select Student
          </label>
          <select
            id="student"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={uploading}
          >
            <option value="">Choose a student...</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={uploading}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className={`relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span>Upload an image</span>
                  <input
                    id="file-upload"
                    ref={fileInputRef}
                    type="file"
                    className="sr-only"
                    onChange={handleUpload}
                    accept="image/jpeg,image/png,image/gif"
                    disabled={uploading || !selectedStudent}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>

        {uploading && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-center text-gray-600">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}