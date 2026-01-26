const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uootjplvbavisijmnzqn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvb3RqcGx2YmF2aXNpam1uenFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MjA4ODksImV4cCI6MjA4MTM5Njg4OX0.KKiw5-G9E0_JrvrX5RxoCWtpAnclSG0n3cbO1lkn9s0';

// Note: Using service_role key to auto-confirm if available would be best, but we only have public key.
// However, the earlier SQL check failed to find the user at all.
// So we will try to create it again.

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
    console.log("Creating admin user...");

    const { data, error } = await supabase.auth.signUp({
        email: 'admin@gmail.com',
        password: 'Pass@12345!',
        options: {
            data: {
                role: 'admin' // Attempt to set metadata initially too
            }
        }
    });

    if (error) {
        console.error('Error creating user:', error);
    } else {
        console.log('User created:', data);
        console.log('If confirmed_at is null, check email or use SQL to confirm.');
    }
}

createAdmin();
