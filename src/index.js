// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { WalletProvider } from './WalletContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </WalletProvider>
  </React.StrictMode>
);
