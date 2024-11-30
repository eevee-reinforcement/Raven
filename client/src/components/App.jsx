import React from 'react';
import { createClient } from "@supabase/supabase-js";
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const App = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = usestate([])

    useEffect(() => {
      getMessages();
      getUsers();
    }, []);

    async function getMessages() {
      const { data } = await supabase.from("messages").select(`*, users("*")`);
      setMessages(data);
    }

    // async function getUsers() {
    //   const { data } = await supabase.from("users").select();
    //   setUsers(data);
    // }

  return (
    <div>
      <h1>Hello world</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.message_id}>
            {message.user_id}: 
            {message.message_content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;