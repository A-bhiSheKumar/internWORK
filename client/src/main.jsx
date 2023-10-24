import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter'; // Assuming your router component is named AppRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
