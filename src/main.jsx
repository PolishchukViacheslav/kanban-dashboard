import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import { client } from '@graphql/client.js';
import { ModalProvider } from './components/modal/ModalProvider.jsx';
import { Toaster } from 'react-hot-toast';

export const ModalContext = React.createContext();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <ModalProvider>
      <Toaster
        toastOptions={{
          duration: 5000,
          className: 'toaster',
          style: {
            borderRadius: '5px',
            color: '#04133B',
          },
        }}
      />
      <App />
    </ModalProvider>
  </ApolloProvider>,
);
