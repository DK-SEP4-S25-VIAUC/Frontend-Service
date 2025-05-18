import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const THEME_KEY = 'theme';

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'system';
        return localStorage.getItem(THEME_KEY) || 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        const applyTheme = (t) => {
            if (t === 'dark') {
                root.classList.add('dark');
            } else if (t === 'light') {
                root.classList.remove('dark');
            } else {
                // System theme
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                root.classList.toggle('dark', prefersDark);
            }
        };

        applyTheme(theme);
        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => {
                applyTheme('system');
            };
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme]);

    const handleChangeTheme = (value) => {
        setTheme(value);
        localStorage.setItem(THEME_KEY, value);
    };

    return (
        <button
            onClick={() =>
                handleChangeTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')
            }
            className="flex items-center justify-center rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
        >
            {theme === 'light' && <SunIcon className="w-5 h-5 text-yellow-500" />}
            {theme === 'dark' && <MoonIcon className="w-5 h-5 text-blue-400" />}
            {theme === 'system' && <ComputerDesktopIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
        </button>
    );
}