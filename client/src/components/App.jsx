import React from 'react';
import Chat from './Chat';
import AuthPage from './AuthPage';
import Chatroom from './Chatroom';
import RoomSettings from './RoomSettings';
import RoomEntry from './RoomEntry';

const App = () => {
  return (
    <>
      <AuthPage />
      {/* <Chatroom></Chatroom> */}
      {/* {/* <RoomSettings></RoomSettings> */} */}
      {/* <RoomEntry></RoomEntry> */}
      <Chat />
    </>
  );
};

export default App;
