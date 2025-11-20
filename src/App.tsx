import { RouterProvider } from 'react-router-dom';
import AppRouter from './AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Modal from './components/modal/Modal';
import Alert from './components/common/Alert';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRouter} />
      <Modal/>
      <Alert/>
    </QueryClientProvider>
  )
}

export default App
