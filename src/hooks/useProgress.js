import { useState, useEffect } from 'react';

const STORAGE_KEY = 'math_practice_progress_v1';

export const useProgress = () => {
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
                // Merge parsed with defaultState to ensure new keys (like 'tables') exist
                return { ...defaultState, ...parsed };
            }
            return defaultState;
        } catch (e) {
            console.error("Failed to load progress", e);
            return defaultState;
        }
    });

    useEffect(() => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

    const updateProgress = (mode, isCorrect) => {
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
    };

    const resetProgress = () => {
        const resetState = {
            root: { correct: 0, total: 0, streak: 0 },
            cube: { correct: 0, total: 0, streak: 0 },
            tables: { correct: 0, total: 0, streak: 0 }
        };
        setProgress(resetState);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
    };

    return { progress, updateProgress, resetProgress };
};
