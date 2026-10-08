import { useContext } from "react";
import { ThemeContext } from "./context/Themecontext";

const ThemeTest = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white text-black dark:bg-gray-900 dark:text-white">
            <h1 className="text-3xl font-bold">
                Current Theme: {theme}
            </h1>

            <button
                onClick={toggleTheme}
                className="rounded-lg bg-black px-5 py-2 text-white dark:bg-active-bg dark:text-black"
            >
                Toggle Theme
            </button>
        </div>
    );
};

export default ThemeTest;