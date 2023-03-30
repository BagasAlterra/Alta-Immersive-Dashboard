import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
import { ReactFlowProvider } from 'reactflow';
import ReactDOM from 'react-dom/client';
import App from 'routes';
import 'styles/index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    {/* <CookiesProvider> */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </GoogleOAuthProvider>
    {/* </CookiesProvider> */}
  </QueryClientProvider>
);
