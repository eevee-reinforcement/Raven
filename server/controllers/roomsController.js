import supabase from '../config.js';

const RoomsController = {
    // Create a room
    async createRoom(req, res) {
        const { host, name, password } = req.body;

        try {
            // Insert room into the `rooms` table
            const { data, error } = await supabase
                .from('rooms')
                .insert([{ host, name, password, status: true }])
                .select();

            if (error) throw error;

            // Add the host to the `joined_users` table
            const { error: joinError } = await supabase
                .from('joined_users')
                .insert([{ username: host, room_id: data[0].id, status: true }]);

            if (joinError) throw joinError;

            res.status(201).json({ message: 'Room created successfully', room: data[0] });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Join a room
    async joinRoom(req, res) {
        const { username, room_name, room_password } = req.body;

        try {
            // Find the room by name and password
            const { data: room, error } = await supabase
                .from('rooms')
                .select('*')
                .eq('name', room_name)
                .eq('password', room_password)
                .single();

            if (error || !room) {
                return res.status(404).json({ error: 'Room not found or password incorrect' });
            }

            // Add user to `joined_users` table
            const { error: joinError } = await supabase
                .from('joined_users')
                .upsert([{ username, room_id: room.id, status: true }]);

            if (joinError) throw joinError;

            res.status(200).json({ message: 'Joined room successfully', room });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Post a message to the room
    async postMessage(req, res) {
        const { username, room_id, message } = req.body;

        try {
            // Insert message into the `messages` table
            const { error } = await supabase
                .from('messages')
                .insert([{ username, room_id, message }]);

            if (error) throw error;

            res.status(201).json({ message: 'Message posted successfully' });
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
                .from('messages')
                .select('*')
                .eq('room_id', room_id)
                .order('sent_at', { ascending: true });

            if (error) throw error;

            res.status(200).json({ messages: data });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = RoomsController;