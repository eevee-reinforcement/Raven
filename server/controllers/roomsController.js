import supabase from '../config.js';

// Rooms Controller
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
            const { data: room, error: roomError } = await supabase
                .from('rooms')
                .select('*')
                .eq('name', room_name)
                .eq('password', room_password)
                .single();

            if (roomError || !room) {
                return res.status(404).json({ error: 'Room not found or password incorrect' });
            }

            // Check if the username already exists in the `joined_users` table for this room
            const { data: existingUser, error: userError } = await supabase
                .from('joined_users')
                .select('*')
                .eq('room_id', room.id)
                .eq('username', username)
                .single();

            if (existingUser) {
                return res.status(400).json({ error: 'Username taken. Please choose a different name.' });
            }

            if (userError && userError.code !== 'PGRST116') { // Ignore "row not found" error
                throw userError;
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
};


export default RoomsController;