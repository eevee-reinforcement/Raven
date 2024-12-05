import supabase from "../config.js";

// create new room 
export const createRoom = async (roomName) => {
    const { data, error } = await supabase.from('rooms').insert([{ name : roomName }]);
    if (error) throw error;
    return data;
}