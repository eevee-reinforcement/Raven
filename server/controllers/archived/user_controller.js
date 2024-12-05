const supabase = require('../../config');
const crypto = require('crypto'); // To generate random IDs

const UserController = {};

/* User table columns:
user_id - primary
event_id - foreign connected to event
personal_un
random_un
icon_id
icon
messages
random_icon_id
random_icon
*/

const generateUserId = () => crypto.randomBytes(8).toString('hex'); // 16-character unique ID

const ensureUniqueUserId = async () => {
    const userId = generateUserId();
    const { data, error } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_id', userId)
        .single();

    if (error && error.code === 'PGRST116') {
        // ID is unique
        return userId;
    } else if (data) {
        // ID conflict, generate a new one
        return ensureUniqueUserId();
    } else {
        throw error; // Handle unexpected errors
    }
};

UserController.createUser = async (req, res) => {
    const { event_id, personal_un, icon } = req.body;

    if (!event_id) {
        return res.status(400).json({ error: 'No Event Detected' });
    }

    try {
        // Check if the personal_un is already in use
        if (personal_un) {
            const { data: existingUsername, error: usernameCheckError } = await supabase
                .from('users')
                .select('user_id, personal_un')
                .eq('personal_un', personal_un)
                .single();

            if (usernameCheckError && usernameCheckError.code !== 'PGRST116') {
                throw usernameCheckError;
            }

            if (existingUsername) {
                return res.status(409).json({
                    error: 'Username already in use. Please choose a different username.',
                });
            }
        }

        // Generate a unique user_id
        const user_id = await ensureUniqueUserId();

        // Insert new user
        const newUser = {
            user_id: user_id,
            evenet_id: event_id,
            personal_un: personal_un || null,
            random_un: random_un,
            icon: icon || null,
            random_icon: random_icon,
        };

        const { error: insertError } = await supabase.from('users').insert(newUser);

        if (insertError) throw insertError;

        return res.status(201).json({ message: 'Profile created.', newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


UserController.sendMessage = async (req, res) => {
    const { event_id, user_id, message_content } = req.body;

    // Validate required fields
    if (!event_id || !user_id) {
        return res.status(400).json({ error: 'Event ID or User ID not detected' });
    }

    if (!message_content) {
        return res.status(400).json({ error: 'Cannont send empty message.' });
    }

    try {
        // Create the new message object
        const newMessage = {
            message_content: message_content,
            user_id: user_id,
            post_date: new Date().toISOString(),
        };

        // Append the new message to the messages_array
        const { error: updateError } = await supabase.rpc('append_message_to_event', {
            event_id_param: event_id,
            message_param: newMessage,
        });

        if (updateError) {
            throw updateError;
        }

        return res.status(201).json({ message: 'Message sent successfully.', newMessage });
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

//   UserController.reportUser = async (req, res) => {
//     const { event_id, user_id, message_content, blocked } = req.body;
//   }

//   UserController.commentMessage = async (req, res) => {

//   }
//methods:
//1) Push message
//- text field always displayed at bottom of screen
//- user is atomatically "clicked" into the field (boolean default to true)
//- if user is clicked into the field
//- flashing curser, text goes into text field
//- on enter
//- push message to board

//2) React to message
//- on click of message content
//- render a display of already used emojis and a plus icon on right side(stretch)
//- on click of previously used emoji
//- increase counter
//- on click of plus icon
//- render a panel of emoji options
//- on click of emoji from panel
//- render that emoji attached to the message content

//3) Comment on message
//- on click of message content
//- render a comment icon with a counter display on left side
//- on click of comment icon
//- display all comments with empty text field at bottom of thread with 'Push message' functionality

//4) Report user
//- on click of prof pic.
//- Render "Report User" button
//- on click of button
//- Render "Reason for report" text box
//- on enter
//- send notification to manager dashboard with message content, message user, and reason for report
module.exports = { UserController };