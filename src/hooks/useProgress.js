import { useState, useEffect } from 'react';

const STORAGE_KEY = 'math_practice_progress_v1';

export const useProgress = () => {
    const [progress, setProgress] = useState(() => {
        try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {
                root: { correct: 0, total: 0, streak: 0 },
                cube: { correct: 0, total: 0, streak: 0 }
            };
        } catch (e) {
            console.error("Failed to load progress", e);
            return {
                root: { correct: 0, total: 0, streak: 0 },
                cube: { correct: 0, total: 0, streak: 0 }
            };
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
            cube: { correct: 0, total: 0, streak: 0 }
        };
        setProgress(resetState);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
    };

    return { progress, updateProgress, resetProgress };
};
