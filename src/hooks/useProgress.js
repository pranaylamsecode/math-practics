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

        // For non-logged users, use sessionStorage
        if (!user) {
            try {
                const stored = sessionStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    return { ...defaultState, ...parsed };
                }
            } catch (e) {
                console.error("Failed to load progress", e);
            }
        }
        return defaultState;
    });

    // Load progress FROM database for logged-in users
    useEffect(() => {
        if (!user) return;

        const loadFromDatabase = async () => {
            try {
                // Get records from last 30 days
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                const { data: records, error } = await supabase
                    .from('practice_records')
                    .select('*')
                    .eq('user_id', user.id)
                    .gte('created_at', thirtyDaysAgo.toISOString())
                    .order('created_at', { ascending: false });

                if (error) throw error;

                // Calculate stats from records
                const stats = {
                    root: { correct: 0, total: 0, streak: 0 },
                    cube: { correct: 0, total: 0, streak: 0 },
                    tables: { correct: 0, total: 0, streak: 0 }
                };

                if (records && records.length > 0) {
                    records.forEach(record => {
                        const mode = record.mode;
                        if (stats[mode]) {
                            stats[mode].total++;
                            if (record.is_correct) {
                                stats[mode].correct++;
                            }
                        }
                    });

                    // Calculate current streak (consecutive correct from most recent)
                    ['root', 'cube', 'tables'].forEach(mode => {
                        const modeRecords = records.filter(r => r.mode === mode);
                        let streak = 0;
                        for (const record of modeRecords) {
                            if (record.is_correct) {
                                streak++;
                            } else {
                                break;
                            }
                        }
                        stats[mode].streak = streak;
                    });
                }

                setProgress(stats);

                // Auto-cleanup: Delete records older than 30 days
                await supabase
                    .from('practice_records')
                    .delete()
                    .eq('user_id', user.id)
                    .lt('created_at', thirtyDaysAgo.toISOString());

            } catch (err) {
                console.error('Error loading progress:', err);
            }
        };

        loadFromDatabase();
    }, [user?.id]);

    // Persist to sessionStorage for non-logged users
    useEffect(() => {
        if (!user) {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        }
    }, [progress, user]);

    const updateProgress = async (mode, isCorrect) => {
        // If logged in, save individual record to database
        if (user) {
            try {
                await supabase
                    .from('practice_records')
                    .insert({
                        user_id: user.id,
                        mode: mode,
                        is_correct: isCorrect,
                        created_at: new Date().toISOString()
                    });

                // Update local state
                setProgress(prev => {
                    const currentMode = prev[mode];
                    return {
                        ...prev,
                        [mode]: {
                            total: currentMode.total + 1,
                            correct: currentMode.correct + (isCorrect ? 1 : 0),
                            streak: isCorrect ? currentMode.streak + 1 : 0
                        }
                    };
                });
            } catch (err) {
                console.error('Error saving record:', err);
            }
        } else {
            // Not logged in - use sessionStorage
            setProgress(prev => {
                const currentMode = prev[mode];
                return {
                    ...prev,
                    [mode]: {
                        total: currentMode.total + 1,
                        correct: currentMode.correct + (isCorrect ? 1 : 0),
                        streak: isCorrect ? currentMode.streak + 1 : 0
                    }
                };
            });
        }
    };

    const resetProgress = async () => {
        const resetState = {
            root: { correct: 0, total: 0, streak: 0 },
            cube: { correct: 0, total: 0, streak: 0 },
            tables: { correct: 0, total: 0, streak: 0 }
        };
        setProgress(resetState);

        if (user) {
            // Delete all records for logged-in user
            try {
                await supabase
                    .from('practice_records')
                    .delete()
                    .eq('user_id', user.id);
            } catch (err) {
                console.error('Error resetting progress:', err);
            }
        } else {
            // Clear sessionStorage for non-logged user
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
        }
    };

    return { progress, updateProgress, resetProgress };
};
