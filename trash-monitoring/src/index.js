import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Tailwind’s main entry (e.g. index.css) and Leaflet’s CSS
import './index.css';
import 'leaflet/dist/leaflet.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
