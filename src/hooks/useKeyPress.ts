import { useEffect, useCallback } from 'react';

export const useKeyPress = (
  targetKey: string,
  onKeyDown?: () => void,
  onKeyUp?: () => void
) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey && !event.repeat && onKeyDown) {
        onKeyDown();
      }
    },
    [targetKey, onKeyDown]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey && onKeyUp) {
        onKeyUp();
      }
    },
    [targetKey, onKeyUp]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
};