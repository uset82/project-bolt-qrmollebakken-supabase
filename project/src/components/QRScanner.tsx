import { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';

interface QRScannerProps {
  onResult: (text: string) => void;
  autoStart?: boolean;
}

export function QRScanner({ onResult, autoStart = false }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(autoStart);
  const { videoRef, canvasRef, isActive, error, startCamera, stopCamera } = useCamera({
    width: 640,
    height: 480,
    onFrame: (imageData) => {
      // In a real QR scanner, we would process the imageData here
      // For now, we'll just simulate a successful scan after 3 seconds
      if (isActive) {
        setTimeout(() => {
          onResult('simulated:qr:code');
          stopScanning();
        }, 3000);
      }
    }
  });

  const startScanning = async () => {
    setIsScanning(true);
    await startCamera();
  };

  const stopScanning = () => {
    setIsScanning(false);
    stopCamera();
  };

  if (!isScanning) {
    return (
      <button
        onClick={startScanning}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <Camera className="w-5 h-5" />
        Scan QR Code
      </button>
    );
  }

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-w-4 aspect-h-3 bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="hidden"
        />
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white">
            <p>{error}</p>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-600 text-center mb-4">
          Position the QR code within the camera view
        </p>
        <button
          onClick={stopScanning}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
}