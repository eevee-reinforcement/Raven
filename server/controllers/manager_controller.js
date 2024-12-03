const supabase = require('../config');
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const ManagerController = {

    // User registration
    async registerManager({ email, username, password }) {
        const { data: existingManager, error: managerError } = await supabase
            .from('managers')
            .select('manager_un')
            .eq('manager_un', username)
            .single();

        if (existingManager) {
            throw new Error('Username already taken. Please select a new username.');
        }

        const hashedPassword = await hashPassword(password);

        const { data, error } = await supabase.from('managers').insert([
            {
                email,
                username,
                password: hashedPassword,
            },
        ]);

        if (error) {
            console.error(error.message);
            throw new Error('An error occurred while registering. Please try again.');
        }

        return { message: 'User registered successfully' };
    },

    // Sign in to existing account
    async signIn({ username, password }) {
        const { data: user, error: userError } = await supabase
            .from('managers')
            .select('manager_id, manager_un, manager_pw')
            .eq('manager_un', username)
            .single();

        if (userError || !user) {
            throw new Error('Invalid username or password');
        }

        const isMatch = await bcrypt.compare(password, user.manager_pw);
        if (!isMatch) {
            throw new Error('Invalid username or password');
        }

        return {
            id: user.manager_id,
            username: user.manager_un,
            message: 'Sign in successful',
        };
    },

    // Reset password
    async resetPassword(email, newPassword) {
        const hashedPassword = await hashPassword(newPassword);

        const { data, error } = await supabase
            .from('managers')
            .update({ password: hashedPassword })
            .eq('manager_email', email);

        if (!data || error) {
            console.error(error?.message || 'No data returned.');
            throw new Error('Email does not exist or failed to update password');
        }

        return { message: 'Password successfully changed' };
    },
};

module.exports = {
    ManagerController,
};
