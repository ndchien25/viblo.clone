import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<Loader2 className="animate-spin" />}>
    {children}
  </Suspense>
);

export default SuspenseWrapper;
