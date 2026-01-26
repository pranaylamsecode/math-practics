import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async (userId) => {
            if (!userId) return null;
            const { data } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single();
            return data?.role;
        };

        // Check active session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            let role = null;
            if (session?.user) {
                role = await fetchRole(session.user.id);
            }
            setUser(session?.user ? { ...session.user, role } : null);
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            let role = null;
            if (session?.user) {
                role = await fetchRole(session.user.id);
            }
            setUser(session?.user ? { ...session.user, role } : null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const value = {
        user,
        signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
        signUp: (email, password) => supabase.auth.signUp({ email, password }),
        signOut: () => supabase.auth.signOut(),
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
