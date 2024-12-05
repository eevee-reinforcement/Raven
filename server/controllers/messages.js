import supabase from "../config.js";

// fetch messages for specific room
export const getMessages = async (roomId) => {
    const { data, error } = await supabase.from('messages').select('*').eq('room_id', roomId);
    if (error) throw error;
    return data;
}

// send message to a room 
export const sendMessage = async (roomId, username, text) => {
    const { data, error } = await supabase
    .from('messages')
    .insert([{ room_id: roomId, username, text}]);
    if (error) throw error;
    return data;
}