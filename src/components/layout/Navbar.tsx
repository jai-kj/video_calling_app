"use client";

import { APP_ROUTES } from "@/config/constants";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const Navbar = () => {
  const key = "dark-mode";

  const getFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    if (!value) return null;

    return JSON.parse(value);
  };

  const setInLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    getFromLocalStorage(key) ?? false,
  );

  const toggleDarkMode = useCallback((newMode: boolean) => {
    setIsDarkMode(newMode);
    setInLocalStorage(key, newMode);
  }, []);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    if (mediaQueryList.matches) {
      toggleDarkMode(true);
    }

    mediaQueryList.addEventListener("change", (e) => toggleDarkMode(e.matches));
  }, [toggleDarkMode]);

  return (
    <header className={`${isDarkMode ? "dark" : ""} shadow`}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between p-3 font-medium">
        <Link href={APP_ROUTES.BASE_ROUTE}>New Meeting</Link>
        <SignedIn>
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => toggleDarkMode(!isDarkMode)}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <Link href={APP_ROUTES.MEETINGS}>Meetings</Link>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
      <style jsx global>
        {`
          :root {
            --foreground-rgb: ${isDarkMode ? "255, 255, 255" : "0, 0, 0"};
            --background-rgb: ${isDarkMode ? "15, 23, 42" : "255, 255, 255"};
            --form-background-rgb: ${isDarkMode
              ? "51, 65, 85"
              : "241, 245, 249"};
          }

          body {
            color: rgb(var(--foreground-rgb));
            background: rgb(var(--background-rgb));
          }

          .meeting-form {
            background: rgb(var(--form-background-rgb));
          }
        `}
      </style>
    </header>
  );
};

export default Navbar;
