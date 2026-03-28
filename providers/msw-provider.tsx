'use client'; // important: makes this a client component

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(
    process.env.NODE_ENV !== 'development',
  );

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('../mocks/browser').then(({ worker }) => {
        worker
          .start({
            onUnhandledRequest: 'warn',
          })
          .then(() => {
            setIsReady(true);
          });
      });
    }
  }, []);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
