import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MsalProvider } from "@azure/msal-react";

import { MsalInstance } from '@/auth/index.ts'
import App from './App.tsx'

import './index.css'
import { ApiClientProvider } from './api/ApiClientProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={MsalInstance}>
      <QueryClientProvider client={queryClient}>
        <ApiClientProvider>
          <App />
        </ApiClientProvider>
      </QueryClientProvider>
    </MsalProvider>
  </StrictMode>,
)
