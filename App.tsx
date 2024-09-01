import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Routes from './src/routes'; // Ensure this path is correct

function App(): React.JSX.Element {
  // Initialize the QueryClient
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
