"use client";

import Link from "next/link";
import React from "react";
import ThemeToggle from "../tools/ThemeSwitcher";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left menu */}
        <ul className="flex space-x-6 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
          <li>
            <Link
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home Page
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/accounts"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Accounts & Payments
            </Link>
          </li>
          <li>
            <Link
              href="/financial"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Savings & Investments
            </Link>
          </li>
        </ul>

        <ul className="flex items-center space-x-4 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
          <li>
            <Link
              href="/login"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Register
            </Link>
          </li>
          <ThemeToggle />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
