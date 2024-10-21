"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { SunDimIcon, MoonIcon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [icon, setIcon] = useState(<SunDimIcon />);

  useEffect(() => {
    if (theme === "dark") {
      setIcon(<SunDimIcon />);
    } else {
      setIcon(<MoonIcon />);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
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