import { formatFileSize } from '../../lib/utils/format';

interface UploadProgressProps {
  progress: number;
  fileName: string;
  fileSize: number;
}

export function UploadProgress({ progress, fileName, fileSize }: UploadProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>{fileName}</span>
        <span>{formatFileSize(fileSize)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-center text-gray-600">
        Uploading... {progress}%
      </p>
    </div>
  );
}