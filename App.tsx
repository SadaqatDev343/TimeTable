import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Routes from './src/routes';
import FlashMessage from 'react-native-flash-message';

function App(): React.JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <FlashMessage position="bottom" />
    </QueryClientProvider>
  );
}

export default App;
