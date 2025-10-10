import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BasicProvider } from './BasicProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BasicProvider>
      <App />
    </BasicProvider>
  </StrictMode>
);
