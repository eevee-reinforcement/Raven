import supabase from "../config.js";

// fetch messages for specific room
export const getMessages = async (roomId) => {
    const { data, error } = await supabase.from('messages').select('*').eq('room_id', roomId);
    if (error) throw error;
    return data;
}

