"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "./switch";
import { Toggle } from "./toggle";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    }, [])
    if (!mount) return null;

    const isDarkMode = theme === "dark" || (theme === "system" && window.matchMedia("(prefer-color-scheme:dark)").matches);
    return (
        <div className="flex items-center gap-2">
            <Toggle onPressedChange={(checked) => setTheme(checked ? "dark" : "light")} className="flex items-center gap-2"
            
            >
                {
                    isDarkMode ? (
                        <Sun className={`h-5 w-5 ${isDarkMode ? "text-primary" : "text-primary"}`} />
                    ):(
                        <Moon className={`h-5 w-5 ${isDarkMode ? "text-primary " : "text-primary"}`} />
                    )
                }
            </Toggle>
        </div>
    )
}