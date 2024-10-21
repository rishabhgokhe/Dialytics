"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { SunDimIcon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [icon, setIcon] = useState(<SunDimIcon />);

  useEffect(() => {
    if (theme === "dark") {
      setIcon(<SunDimIcon />); // Set icon for dark mode
    } else {
      setIcon(<SunDimIcon />); // Set icon for light mode
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light"); // Toggle to light theme
    } else {
      setTheme("dark"); // Toggle to dark theme
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="ml-2 h-8 w-8"
      onClick={toggleTheme}
    >
      {icon}
    </Button>
  );
};

export default ThemeToggle;