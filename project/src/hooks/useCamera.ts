import { useState, useEffect, useRef } from 'react';

interface UseCameraOptions {
  onFrame?: (imageData: ImageData) => void;
  width?: number;
  height?: number;
}

export function useCamera({ onFrame, width = 640, height = 480 }: UseCameraOptions = {}) {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsActive(true);
        setError(null);
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Could not access camera');
      setIsActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  };

  useEffect(() => {
    let animationFrame: number;

    const processFrame = () => {
      if (videoRef.current && canvasRef.current && isActive && onFrame) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          context.drawImage(videoRef.current, 0, 0, width, height);
          const imageData = context.getImageData(0, 0, width, height);
          onFrame(imageData);
        }
      }
      animationFrame = requestAnimationFrame(processFrame);
    };

    if (isActive && onFrame) {
      processFrame();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isActive, onFrame, width, height]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    isActive,
    error,
    startCamera,
    stopCamera
  };
}