import React from 'react';


const PanelElements = () => {
    return (
        <div>
        <aside className="sidebar">
        <h2>Bank DashBoard</h2> 
        <nav className="sidebar-nav">
            <a href="/dashboard">Account Statics</a>
            <a href="/dashboard/payments">Transactions</a>
            <a href="/dashboard/accmanag">Accounts</a>
            <a href="/dashboard/statistic">Statistics and Reports</a>
            <a href="/dashboard/funds">Budget</a>
            <a href="/dashboard/creditdebit">Investments</a>
            <a href="/dashboard/loans">Loans</a>
            <a href="/dashboard/rewards">Rewards</a>
            <a href="/dashboard/settings">Security Settings</a>
        </nav>
        </aside>
        </div>
    )
}

export default PanelElements;
