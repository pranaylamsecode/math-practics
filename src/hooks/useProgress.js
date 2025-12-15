import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const STORAGE_KEY = 'math_practice_progress_v1';

export const useProgress = () => {
    const { user } = useAuth();
    const [progress, setProgress] = useState(() => {
        const defaultState = {
            root: { correct: 0, total: 0, streak: 0 },
            cube: { correct: 0, total: 0, streak: 0 },
            tables: { correct: 0, total: 0, streak: 0 }
        };

        try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...defaultState, ...parsed };
            }
            return defaultState;
        } catch (e) {
            console.error("Failed to load progress", e);
            return defaultState;
        }
    });

    // Sync FROM database when user logs in
    useEffect(() => {
        if (!user) return;

        const fetchProgress = async () => {
            try {
                const { data, error } = await supabase
                    .from('user_progress')
                    .select('data')
                    .eq('user_id', user.id)
                    .single();

                if (data?.data) {
                    setProgress(prev => ({ ...prev, ...data.data }));
                    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
                }
            } catch (err) {
                console.error('Error loading progress:', err);
            }
        };

        fetchProgress();
    }, [user?.id]);

    // Persist to sessionStorage
    useEffect(() => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

    const updateProgress = async (mode, isCorrect) => {
        let newProgress;

        setProgress(prev => {
            const currentMode = prev[mode];
            const updated = {
                ...prev,
                [mode]: {
                    total: currentMode.total + 1,
                    correct: currentMode.correct + (isCorrect ? 1 : 0),
                    streak: isCorrect ? currentMode.streak + 1 : 0
                }
            };
            newProgress = updated;
            return updated;
        });

        // Sync TO database if logged in
        if (user && newProgress) {
            try {
                await supabase
                    .from('user_progress')
                    .upsert({
                        user_id: user.id,
                        data: newProgress,
                        updated_at: new Date().toISOString()
                    });
            } catch (err) {
                console.error('Error saving progress:', err);
            }
        }
    };

    const resetProgress = async () => {
        const resetState = {
            root: { correct: 0, total: 0, streak: 0 },
            cube: { correct: 0, total: 0, streak: 0 },
            tables: { correct: 0, total: 0, streak: 0 }
        };
        setProgress(resetState);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));

        if (user) {
            try {
                await supabase
                    .from('user_progress')
                    .upsert({
                        user_id: user.id,
                        data: resetState,
                        updated_at: new Date().toISOString()
                    });
            } catch (err) {
                console.error('Error resetting progress:', err);
            }
        }
    };

    return { progress, updateProgress, resetProgress };
};
