"use client";

import React, {useState, useEffect} from 'react';

export default const ThemeChanger = () => {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        const savedTheme = localStorage.getItme('theme');
        if(savedTheme) {
            setCUrrentTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            setTheme('light');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const ToggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
}
