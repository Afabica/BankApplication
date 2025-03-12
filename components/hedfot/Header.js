//"use client";
//
//import React from "react";
//import Link from "next/link";
//
//const Header = () => {
//  return (
//    <div>
//      <div className="NavCont">
//        <nav className="navbar">
//          <ul className="navbar">
//            <li>
//              <Link href="/">Home</Link>
//            </li>
//            <li>
//              <Link href="/regisration">Register</Link>
//            </li>
//            <li>
//              <Link href="/about">About</Link>
//            </li>
//            <li>
//              <Link href="/login">Login</Link>
//            </li>
//          </ul>
//        </nav>
//      </div>
//    </div>
//  );
//

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-center bg-white shadow p-4 rounded-2xl">
      <ul className="flex justify-between">
        <li>
          <Link href="/" className="m-20">
            Home
          </Link>
        </li>
        <li>
          <Link href="/registration" className="m-20">
            Register
          </Link>
        </li>
        <li>
          <Link href="/login" className="m-20">
            Login
          </Link>
        </li>
        <li>
          <Link href="/support" className="m-20">
            Support
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
