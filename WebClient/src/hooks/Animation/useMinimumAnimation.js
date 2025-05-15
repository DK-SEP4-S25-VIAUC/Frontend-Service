import { useState, useEffect } from 'react';

export function useMinimumAnimation(isActuallyLoading, minDuration = 1000) {
    const [isAnimating, setIsAnimating] = useState(false);

    // Start animation manually (for button clicks)
    const startAnimation = () => {
        setIsAnimating(true);
    };

    // Monitor actual loading state
    useEffect(() => {
        let timer;

        if (isActuallyLoading) {
            setIsAnimating(true);
        } else if (!isActuallyLoading && isAnimating) {
            timer = setTimeout(() => {
                setIsAnimating(false);
            }, minDuration);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isActuallyLoading, isAnimating, minDuration]);

    return [isAnimating, startAnimation];
}