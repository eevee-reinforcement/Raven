const supabase = require('../config');
const bcrypt = require('bcryptjs');

const ManagerController = {

    // user registration 
    async registerManager({ email, username, password }) {

        const { data: existingManager, error: managerError } = await supabase
            .from('managers')
            .select('manager_un')
            .eq('manager_un', username)
            .single();

        if (existingManager) {
            throw new Error('Username already taken. Please select a new username.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase.from('managers').insert([
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
            .from('managers')
            .select('manager_id, manager_un, manager_pw')
            .eq('manager_un', username)
            .single();

        if (userError) throw new Error('Invalid username or password');

        const isMatch = await bcrypt.compare(password, managers.manager_pw);
        if (!isMatch) throw new Error('Invalid username or password');

        return { id: managers.manager_id, username: managers.manager_un, message: 'Sign in successful' };
    },

    // reset password
    async resetPassword(email, newPassword) {
        const { data: user, error: userError } = await supabase
            .from('managers')
            .select('*')
            .eq('manager_email', email)
            .single();

        if (userError) throw new Error('Email does not exist');

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const { data, error } = await supabase
            .from('managers')
            .update({ password: hashedPassword })
            .eq('manager_email', email);

        if (error) throw new Error('Failed to update password');

        return { message: 'Password successfully changed' };
    },

};


module.exports = {
    UserController,
};
