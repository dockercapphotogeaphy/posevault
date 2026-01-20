import { WifiOff, Wifi } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useState, useEffect } from 'react';

/**
 * Displays a banner when the user is offline
 * Shows a brief notification when coming back online
 */
export function OfflineIndicator() {
  const isOnline = useOnlineStatus();
  const [showOnlineNotification, setShowOnlineNotification] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    // Track if user was offline to show "back online" message
    if (!isOnline) {
      setWasOffline(true);
    }

    // When coming back online, show notification briefly
    if (isOnline && wasOffline) {
      setShowOnlineNotification(true);
      const timer = setTimeout(() => {
        setShowOnlineNotification(false);
        setWasOffline(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  // Show "Back Online" notification
  if (showOnlineNotification) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white px-4 py-2 shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <Wifi className="w-5 h-5" />
          <span className="font-medium">Back Online</span>
        </div>
      </div>
    );
  }

  // Show "Offline Mode" banner
  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-white px-4 py-2 shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <WifiOff className="w-5 h-5" />
          <span className="font-medium">Offline Mode - Your data is saved locally</span>
        </div>
      </div>
    );
  }

  return null;
}
