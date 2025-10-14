import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BasicProvider } from './BasicProvider.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectRoutes from './Routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BasicProvider>
      <Router>
        <ProjectRoutes />
      </Router>
    </BasicProvider>
  </StrictMode>
);