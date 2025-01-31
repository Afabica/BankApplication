'use client';

import Link from "next/link";

const DashBar = () => {
    <div>
    <ul className="links">
        <li>
            <Link href="/accmanag">
            <a className="linkname">
                Account managements
            </a>
            </Link>
        </li>
        <li>
            <Link href="/creditdebit">
            <a className="linkname">
                Credit/Debit cards
            </a>
            </Link>
        </li>
        <li> 
            <Link href="/funds">
            <a className="linkname">
                Funds
            </a>
            </Link>
        </li>
        <li>    
            <Link href="/profile">
            <a className="linkname">
                Profile 
            </a>
            </Link>
        </li>
        <li> 
            <Link href="/support">
            <a className="linkname">
                Support
            </a>
            </Link>
        </li>
        <li> 
            <Link href="/transfers">
            <a className="linkname">
                Transfers 
            </a>
            </Link>
        </li>
        </ul>
    </div>
        
}
