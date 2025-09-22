import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Import HashRouter instead of BrowserRouter
import { HashRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. Use HashRouter here */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

