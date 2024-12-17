import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
      <AlertTriangle className="w-5 h-5 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
}