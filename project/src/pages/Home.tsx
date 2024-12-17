import { useState } from 'react';
import { Image, QrCode, Upload } from 'lucide-react';
import { UploadForm } from '../components/UploadForm';
import { RecentUploads } from '../components/RecentUploads';
import { QRScanner } from '../components/QRScanner';
import toast from 'react-hot-toast';

export function Home() {
  const [view, setView] = useState<'select' | 'teacher' | 'parent'>('select');
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleQRScan = async (qrData: string) => {
    try {
      console.log('QR Data:', qrData);
      toast.success('QR code scanned successfully');
      setShowQRScanner(false);
    } catch (error) {
      console.error('QR scan error:', error);
      toast.error('Invalid QR code');
    }
  };

  if (view === 'select') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <button
            onClick={() => setView('teacher')}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center group"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
              <Upload className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Teacher Access</h2>
            <p className="text-gray-600">Upload and manage student artwork</p>
          </button>

          <button
            onClick={() => setView('parent')}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center group"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
              <QrCode className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Parent Access</h2>
            <p className="text-gray-600">View your child's artwork via QR code</p>
          </button>
        </div>
      </div>
    );
  }

  if (view === 'parent') {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setView('select')}
          className="mb-8 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
        >
          ← Back to selection
        </button>

        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Parent Access</h2>
          <p className="text-gray-600 mb-8">
            Scan your QR code to view your child's artwork collection
          </p>

          {showQRScanner ? (
            <QRScanner
              onResult={handleQRScan}
              autoStart={true}
            />
          ) : (
            <button
              onClick={() => setShowQRScanner(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <QrCode className="w-5 h-5" />
              Scan QR Code
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setView('select')}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
        >
          ← Back to selection
        </button>
      </div>

      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Teacher Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Upload and manage student artwork
        </p>
      </section>

      <UploadForm onUploadComplete={() => {}} />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Uploads</h2>
        <RecentUploads />
      </section>
    </div>
  );
}