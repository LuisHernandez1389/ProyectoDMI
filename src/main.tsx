import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import  Auth0ProviderWithHistory  from './Auth/Auth0Provider';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </React.StrictMode>,
);