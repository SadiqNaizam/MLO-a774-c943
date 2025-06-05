import React from 'react';
import { Button } from "@/components/ui/button";
import { Sun, Moon } from 'lucide-react';
// import { useTheme } from 'next-themes'; // If using next-themes

interface ThemeSwitcherControlProps {
    // Example: could take current theme and setTheme function as props
    // currentTheme: 'light' | 'dark';
    // setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeSwitcherControl: React.FC<ThemeSwitcherControlProps> = () => {
    // const { theme, setTheme } = useTheme(); // Example with next-themes
    const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>('dark'); // Placeholder state
    console.log("Rendering ThemeSwitcherControl, current theme:", currentTheme);

    const toggleTheme = () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(newTheme);
        // setTheme(newTheme); // With next-themes
        console.log("Theme switched to:", newTheme); 
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };
    
    React.useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setCurrentTheme(isDark ? 'dark' : 'light');
    }, []); // Check initial theme only once

    // Effect to apply theme class when currentTheme state changes (e.g. from initial load or toggle)
    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    }, [currentTheme]);

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="border-border text-muted-foreground hover:text-foreground hover:bg-accent/10"
            aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
        >
            {currentTheme === 'light' ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            )}\
        </Button>
    );
};

export default ThemeSwitcherControl;