const supabase = require('../config');
const bcrypt = require('bcryptjs');

const UserController = {

    // user registration 
    async registerUser({ email, username, password }) {

        const { data: existingUser, error: userError } = await supabase
            .from('users')
            .select('username')
            .eq('username', username)
            .single();

        if (existingUser) {
            throw new Error('Username already taken. Please select a new username.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase.from('users').insert([
            {
                email,
                username,
                password: hashedPassword,
            },
        ]);

        if (error) throw new Error(error.message);
        return { message: 'User registered successfully' };
    },

    // sign in to existing account 
    async signIn({ username, password }) {
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('id, username, password')
            .eq('username', username)
            .single();

        if (userError) throw new Error('Invalid username or password');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid username or password');

        return { id: user.id, username: user.username, message: 'Sign in successful' };
    },

    // reset password
    async resetPassword(email, newPassword) {
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (userError) throw new Error('Email does not exist');

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const { data, error } = await supabase
            .from('users')
            .update({ password: hashedPassword })
            .eq('email', email);

        if (error) throw new Error('Failed to update password');

        return { message: 'Password successfully changed' };
    },

};


module.exports = {
    UserController,
};
