import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

// establish socket connection to server
const socket = io("http://localhost:3000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  //listen for incoming messavges when component mounts
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // clean socket listener when component unmounts
    return () => {
      socket.off("chat message");
    };
  }, []);

  // handle message input change
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
        socket.emit('chat message', message); // send message to server
        setMessage(''); // clear input 
    }
  };

  return (
    <div>
        <h1>Raven Chat</h1>
        <div className="chat-box">
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
        <form onSubmit={handleSend}>
            <input 
            type="text" 
            value={message}
            onChange={handleChange}
            placeholder="chat"
            />
            <button type="submit">Send</button>
        </form>
    </div>
  )
};

export default ChatApp;
