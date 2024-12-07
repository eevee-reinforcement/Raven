import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import Chatroom from '../src/components/Chatroom.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path={`/api/entry/${roomName}`} element={<Chatroom />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


// {<Route path="chat" element={<Chatroom />} />}