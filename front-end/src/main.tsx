import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { store } from './redux-toolkit/store';
import { apiSlice } from './redux-toolkit/apiSlice';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ApiProvider api={apiSlice}>
        <Router>
          <App />
        </Router>
      </ApiProvider>
    </Provider>
  </QueryClientProvider>
);
