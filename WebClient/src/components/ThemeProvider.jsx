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
        <div className="relative inline-block text-left">
            <button
                onClick={() =>
                    handleChangeTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')
                }
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
            >
                {theme === 'light' && <SunIcon className="w-6 h-6 text-yellow-500" />}
                {theme === 'dark' && <MoonIcon className="w-6 h-6 text-gray-200" />}
                {theme === 'system' && <ComputerDesktopIcon className="w-6 h-6 text-blue-500" />}
            </button>
        </div>
    );
}