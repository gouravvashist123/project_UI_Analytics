import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-logo">MyApp</h2>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">Dashboard</li>
            <li>Users</li>
            <li>Analytics</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="navbar">
          <h1>Dashboard</h1>
          <div className="user-profile">
            <span className="username">John Doe</span>
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="User profile"
              className="user-avatar"
            />
          </div>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$12,340</p>
          </div>
          <div className="card">
            <h3>New Orders</h3>
            <p>423</p>
          </div>
          <div className="card">
            <h3>Server Uptime</h3>
            <p>99.9%</p>
          </div>
        </section>

        <section className="charts">
          <div className="chart-container">
            <h3>Sales Overview</h3>
            <div className="chart-placeholder">[Chart goes here]</div>
          </div>
          <div className="chart-container">
            <h3>User Activity</h3>
            <div className="chart-placeholder">[Chart goes here]</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;