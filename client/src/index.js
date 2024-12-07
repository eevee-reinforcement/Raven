import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import Chatroom from '../src/components/Chatroom.jsx';
import AuthPage from '../src/components/archived/AuthPage.jsx';
import RoomSettings from '../src/components/archived/RoomSettings.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="chat" element={<Chatroom />} />
        <Route path="signin" element={<AuthPage />} />
        <Route path="room" element={<RoomSettings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
