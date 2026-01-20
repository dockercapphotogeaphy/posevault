import React, { useEffect, useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';

export default function UploadProgressModal({
  isVisible,
  currentImage,
  totalImages,
  isComplete
}) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isVisible || isComplete) {
      setElapsedTime(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible, isComplete]);

  if (!isVisible) return null;

  const progress = totalImages > 0 ? Math.round((currentImage / totalImages) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <div className="flex flex-col items-center">
          {/* Icon and Status */}
          {isComplete ? (
            <>
              <div className="w-16 h-16 mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold mb-2">Upload Complete!</h2>
              <p className="text-gray-400 text-center mb-4">
                Successfully uploaded {totalImages} {totalImages === 1 ? 'image' : 'images'}
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Upload size={32} className="text-blue-500 animate-pulse" />
              </div>
              <h2 className="text-xl font-bold mb-2">Uploading Images</h2>
              <p className="text-gray-400 text-center mb-4">
                Processing {currentImage} of {totalImages} {totalImages === 1 ? 'image' : 'images'}...
              </p>
            </>
          )}

          {/* Progress Bar */}
          {!isComplete && (
            <>
              <div className="w-full bg-gray-700 rounded-full h-3 mb-3 overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress Percentage and Time */}
              <div className="flex justify-between w-full text-sm mb-2">
                <span className="text-gray-400">{progress}%</span>
                <span className="text-gray-400">
                  {elapsedTime}s elapsed
                </span>
              </div>

              {/* Processing Message */}
              <div className="flex items-center gap-2 mt-4">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="text-sm text-gray-400">
                  Optimizing and converting images...
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
