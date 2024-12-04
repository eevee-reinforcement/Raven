import React from "react";
import Box from "@mui/material/Box";
import Message from "../components/Message";
import database from "../database.json";

/**
 * Messages component that renders all messages in the DB.
 */
const Messages = ({ messages }) => {
  return (
    <div>
      <Box
        component="form"
        aria-label="messages-box"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "8px",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          width: 500,
          maxWidth: "100%",
          gap: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
        noValidate
        autoComplete="off"
      >
        {
          /* Render a Message component for each message in the mock database  */
          // Object.keys(messages).map((key) => {
          //   return (
          //     <Message
          //       username={messages[key].username}
          //       body={messages[key].body}
          //     />
          //   );
          // })
        }
        {messages.map((msg, index) => (
          <Message 
            key={index}
            username={"Tyler Durden"} 
            body={msg.text}
          />
        ))}
      </Box>
    </div>
  );
};

export default Messages;
