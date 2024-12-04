import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import Chatroom from '../src/components/Chatroom.jsx';
import AuthPage from '../src/components/AuthPage.jsx';
import EventSettings from '../src/components/EventSettings.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="chat" element={<Chatroom />} />
        <Route path="signin" element={<AuthPage />} />
        <Route path="event" element={<EventSettings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
