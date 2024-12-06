import supabase from "../config.js";

// Messages Controller
const MessagesController = {
  // Post a message to the room
  async postMessage(req, res) {
    console.log("Received body:", req.body);
    const { username, message, room_id } = req.body;
    try {
      // Insert message into the `messages` table
      const { error } = await supabase
        .from("messages")
        .insert([{ username, message, room_id }]);

      if (error) throw error;

      res.status(201).json({ message: "Message posted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all messages for a room
  async getMessages(req, res) {
    const { room_id } = req.params;

    try {
      // Fetch all messages for the given room ID
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", room_id)
        .order("sent_at", { ascending: true });

      if (error) throw error;

      res.status(200).json({ messages: data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default MessagesController;
