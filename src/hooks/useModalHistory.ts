import { useEffect } from 'react';

/**
 * useModalHistory
 * When a modal is open, pushes a dummy history entry so the browser
 * back button closes the modal instead of navigating away.
 */
export function useModalHistory(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    // Push a dummy state so back button has something to pop
    window.history.pushState({ modal: true }, '');

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // If the modal is closed programmatically (not by back button),
      // go back to remove the dummy history entry we pushed
      if (window.history.state?.modal) {
        window.history.back();
      }
    };
  }, [isOpen, onClose]);
}
