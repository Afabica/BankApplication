// components/Navbar.js
 // Mark this as a client component

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-lg">
          MyLogo
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto`}
        >
          <ul className="text-white md:flex md:space-x-8">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gray-300">
                Services
              </Link>
            </li>
            <li className="relative group">
              <button className="hover:text-gray-300 focus:outline-none">
                More
              </button>
              <div className="absolute left-0 hidden mt-2 space-y-2 bg-white rounded-md shadow-lg group-hover:block">
                <Link href="/team" className="block px-4 py-2 text-black">
                  Our Team
                </Link>
                <Link href="/contact" className="block px-4 py-2 text-black">
                  Contact
                </Link>
                <Link href="/blog" className="block px-4 py-2 text-black">
                  Blog
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

