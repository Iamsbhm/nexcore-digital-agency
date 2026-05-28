import { useEffect, useRef } from 'react';

/**
 * useModalHistory
 * When a modal is open, pushes a dummy history entry so the browser
 * back button closes the modal instead of navigating away.
 */
export function useModalHistory(isOpen: boolean, onClose: () => void) {
  // Keep onClose in a ref so changing it never re-triggers the effect
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Track whether the modal was already closed by the popstate (back button)
  // so we don't call history.back() again in cleanup
  const closedByPopState = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    closedByPopState.current = false;

    // Push a dummy history entry — back button now has something to pop
    window.history.pushState({ modal: true }, '');

    const handlePopState = () => {
      closedByPopState.current = true;
      onCloseRef.current();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);

      // Only go back if the modal was NOT already closed by the back button.
      // This removes the dummy history entry when the user closes via ✕ button.
      if (!closedByPopState.current && window.history.state?.modal) {
        window.history.back();
      }
    };
  }, [isOpen]); // ← ONLY isOpen — not onClose (that would re-run on every render)
}
