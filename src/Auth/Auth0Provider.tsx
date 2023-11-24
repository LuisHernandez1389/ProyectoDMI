// src/Auth/Auth0Provider.tsx
import React from 'react';
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';

interface Auth0ProviderWithHistoryProps {
  children: React.ReactNode;
}

const Auth0ProviderWithHistory: React.FC<Auth0ProviderWithHistoryProps> = ({ children }) => {
  const domain = 'dev-5huiww2qxzush6kt.us.auth0.com';
  const clientId = 'GA7ob3glVq29V3kykVcnX2U84y7A93bI';

  const auth0Options: Auth0ProviderOptions = {
    domain,
    clientId,
    // authorizationParams es un objeto que puedes utilizar para especificar parámetros adicionales en la solicitud de autorización
    authorizationParams: {
      redirect_uri: window.location.origin, // Establece la URL de redirección aquí
    },
  };

  return (
    <Auth0Provider {...auth0Options}>
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
