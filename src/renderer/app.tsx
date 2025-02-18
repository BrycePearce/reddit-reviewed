import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import { AuthProvider } from './context/AuthContext';
import Root from './Root';

const queryClient = new QueryClient();
const container = document.getElementById('app');
if (!container) throw new Error('No root element found');
const root = createRoot(container);

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider queryClient={queryClient}>
      <Root />
    </AuthProvider>
  </QueryClientProvider>
);
