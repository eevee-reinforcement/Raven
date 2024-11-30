import React from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://eutmuhtelnmjxioxfbud.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1dG11aHRlbG5tanhpb3hmYnVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NzMxMjMsImV4cCI6MjA0ODI0OTEyM30.CInfKoQipixQm4UJD8a_piZYOdd7iuaYEOUc5EV5u2o");

const App = () => {
  const [messages, setMessages] = useState([]);

    useEffect(() => {
      getMessages();
    }, []);

    async function getMessages() {
      const { data } = await supabase.from("messages").select();
      setMessages(data);
    }
  return (
    <div>
      <h1>Hello world</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.message_id}>{message.user_id}: {message.message_content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;