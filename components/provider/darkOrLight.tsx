"use client";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

export function DarkLight() {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <Button
      onClick={toggleTheme}
      className="px-3 py-1 rounded-lg border text-sm"
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </Button>
  );
}
