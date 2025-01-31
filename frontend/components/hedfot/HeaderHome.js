import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <div>
            <div className="NavCont">
                <nav className="navbar">
                    <ul className="navbar-left">
                        <li>
                            <Link href="/">Home Page</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/accounts">Accounts and Payments</Link>
                        </li>
                        <li>
                            <Link href="/financial">Savings, Investments, and Pensions</Link>
                        </li>
                    </ul>
                    <ul className="navbar-right">
                        <li>
                            <Link href="/signin">Sign In</Link>
                        </li>
                        <li>
                            <Link href="/registration">Registration</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;
