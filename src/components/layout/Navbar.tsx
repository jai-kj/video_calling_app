"use client";

import { APP_ROUTES } from "@/config/constants";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className={`${isDarkMode ? "dark" : ""} shadow`}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between p-3 font-medium">
        <Link href={APP_ROUTES.BASE_ROUTE}>New Meeting</Link>
        <SignedIn>
          <div className="flex items-center gap-5">
            <button onClick={toggleDarkMode}>
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
