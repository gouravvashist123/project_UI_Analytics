import React from "react";
import {
  Bar,
  Line,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const sidebarItems = [
  { name: "Home", icon: "🏠" },
  { name: "Tests", icon: "🧪" },
  { name: "Reports", icon: "📊", selected: true },
  { name: "Compliance", icon: "✅" },
  { name: "Trust Center", icon: "🔒" },
  { name: "Risk", icon: "⚠️" },
  { name: "Vendor", icon: "🏢" },
  { name: "Personnel", icon: "👥" },
  { name: "Integrations", icon: "🔌" },
  { name: "Settings", icon: "⚙️" },
];

// Sample data for charts:
const inherentRiskData = {
  labels: [
    "Aug 13",
    "Aug 20",
    "Aug 27",
    "Sep 03",
    "Sep 10",
  ],
  datasets: [
    {
      label: "High Risk",
      data: [4, 2, 6, 5, 4],
      backgroundColor: "#d33",
      stack: "Stack 0",
    },
    {
      label: "Medium Risk",
      data: [3, 5, 3, 2, 3],
      backgroundColor: "#ff7b00",
      stack: "Stack 0",
    },
    {
      label: "Low Risk",
      data: [2, 3, 2, 3, 2],
      backgroundColor: "#1565c0",
      stack: "Stack 0",
    },
  ],
};

const assignedControlsData = {
  labels: [
    "Aug 13",
    "Aug 20",
    "Aug 27",
    "Sep 03",
    "Sep 10",
  ],
  datasets: [
    {
      label: "Assigned",
      data: [90, 88, 92, 85, 90],
      backgroundColor: "#0d47a1",
    },
    {
      label: "Unassigned",
      data: [10, 12, 8, 15, 10],
      backgroundColor: "#cfd8dc",
    },
  ],
};

const frameworkProgressData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Progress",
      data: [
        5, 12, 28, 45, 56, 70, 82, 90, 92, 95, 98, 100,
      ],
      borderColor: "#1976d2",
      fill: false,
      tension: 0.3,
      pointRadius: 0,
    },
  ],
};

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">🛡️</span> ComplianceIQ
      </div>
      <nav>
        {sidebarItems.map(({ name, icon, selected }) => (
          <div
            key={name}
            className={`sidebar-item ${
              selected ? "active" : ""
            }`}
          >
            <span className="icon">{icon}</span>
            <span>{name}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function OverviewCard({
  title,
  value,
  change,
  changeUp = true,
  description,
}) {
  return (
    <div className="overview-card">
      <div className="overview-value">{value}</div>
      <div className={"overview-change " + (changeUp ? "up" : "down")}>
        {changeUp ? "▲" : "▼"} {change}
      </div>
      <div className="overview-title">{title}</div>
      <div className="overview-description">{description}</div>
    </div>
  );
}

function TaskCompletion() {
  return (
    <section className="task-completion">
      <h3>
        Program task completion rate within SLA over the last
        30 days
      </h3>
      <p className="subtitle">
        How often you remediated items within SLA
      </p>
      <div className="task-bars">
        <div className="task-bar-group">
          <div className="task-title">Remediated by due date</div>
          <div className="task-percent">
            93%
            <span className="small-text"> (483 of 521)</span>
          </div>
          <div className="progress-bar bg-blue">
            <div
              className="progress-filled"
              style={{ width: "93%" }}
            ></div>
          </div>
          <div className="change-up">▲ 27% Compared to the previous 30 day period</div>
        </div>

        <div className="task-bar-group">
          <div className="task-title">Remediated past due date</div>
          <div className="task-percent">
            7%
            <span className="small-text"> (36 of 521)</span>
          </div>
          <div className="progress-bar bg-lightblue">
            <div
              className="progress-filled"
              style={{ width: "7%" }}
            ></div>
          </div>
          <div className="change-down">▼ 18% Compared to the previous 30 day period</div>
        </div>

        <div className="task-bar-group">
          <div className="task-title">Remediated without due date</div>
          <div className="task-percent">
            0%
            <span className="small-text"> (2 of 521)</span>
          </div>
          <div className="progress-bar bg-lightblue">
            <div
              className="progress-filled"
              style={{ width: "0%" }}
            ></div>
          </div>
          <div className="change-down">▼ 9% Compared to the previous 30 day period</div>
        </div>
      </div>
    </section>
  );
}

function InherentRisk() {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        title: { display: true, text: "Number of Inherent Risks" },
      },
      x: {
        title: { display: true, text: "Date" },
        stacked: true,
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
  };
  return (
    <section className="chart-card">
      <h4>Inherent risk</h4>
      <p className="subtitle">Risk scenarios over time grouped by risk level</p>
      <Bar data={inherentRiskData} options={options} />
    </section>
  );
}

function AssignedControls() {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 25 },
        title: { display: true, text: "Number of controls" },
      },
      x: {
        stacked: true,
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
  };
  return (
    <section className="chart-card">
      <h4>Assigned controls</h4>
      <p className="subtitle">
        Control owner assignment status over time
      </p>
      <Bar data={assignedControlsData} options={options} />
    </section>
  );
}

function FrameworkProgress() {
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => value + "%",
        },
        title: { display: true, text: "Completion" },
      },
    },
  };
  return (
    <section className="chart-card" style={{ gridColumn: "span 2" }}>
      <h4>Framework progress</h4>
      <p className="subtitle">
        Total progress completion of frameworks over time
      </p>
      <Line data={frameworkProgressData} options={options} />
    </section>
  );
}

const audits = [
  {
    type: "ISO 27001",
    status: "In audit",
    dueDate: "2024-10-15",
  },
  {
    type: "SOC 2 Type II",
    status: "Awaiting report",
    dueDate: "2024-09-30",
  },
  {
    type: "HIPAA Compliance",
    status: "Completed",
    dueDate: "2024-08-20",
  },
  {
    type: "GDPR Readiness",
    status: "In audit",
    dueDate: "2024-11-01",
  },
  {
    type: "PCI DSS",
    status: "Completed",
    dueDate: "2024-07-25",
  },
  {
    type: "NIST CSF",
    status: "Upcoming",
    dueDate: "2024-12-01",
  },
];

function StatusBadge({ status }) {
  const colorMap = {
    "In audit": "#616161",
    "Awaiting report": "#9e9e9e",
    Completed: "#4caf50",
    Upcoming: "#2196f3",
  };
  return (
    <span
      className="status-badge"
      style={{
        backgroundColor: colorMap[status] || "#e0e0e0",
        color: "#fff",
        padding: "2px 8px",
        borderRadius: "12px",
        fontSize: "0.75rem",
      }}
    >
      {status}
    </span>
  );
}

function Audits() {
  return (
    <section className="table-card" style={{ gridColumn: "span 2" }}>
      <h4>Audits as of today</h4>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {audits.map(({ type, status, dueDate }) => (
            <tr key={type}>
              <td>{type}</td>
              <td>
                <StatusBadge status={status} />
              </td>
              <td>{dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

const activities = [
  {
    activity: "Implemented data encryption",
    status: "Completed",
    date: "2024-09-28",
  },
  {
    activity: "Updated privacy policy",
    status: "In Progress",
    date: "2024-09-25",
  },
  {
    activity: "Conducted security awareness training",
    status: "Completed",
    date: "2024-09-20",
  },
  {
    activity: "Reviewed vendor contracts",
    status: "Pending",
    date: "2024-09-18",
  },
  {
    activity: "Assessed new system for compliance",
    status: "Completed",
    date: "2024-09-15",
  },
  {
    activity: "Generated quarterly compliance report",
    status: "Completed",
    date: "2024-09-10",
  },
];

function ActivityStatus({ status }) {
  const colorMapping = {
    Completed: "#4caf50",
    "In Progress": "#ffb300",
    Pending: "#f44336",
  };
  return (
    <span
      className="status-badge"
      style={{
        backgroundColor: colorMapping[status] || "#e0e0e0",
        color: "#fff",
        padding: "2px 8px",
        borderRadius: "12px",
        fontSize: "0.75rem",
      }}
    >
      {status}
    </span>
  );
}

function RecentActivities() {
  return (
    <section className="table-card" style={{ gridColumn: "span 2" }}>
      <h4>Recent Compliance Activities</h4>
      <p className="subtitle">
        Overview of the latest actions taken to maintain
        compliance.
      </p>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(({ activity, status, date }) => (
            <tr key={activity}>
              <td>{activity}</td>
              <td>
                <ActivityStatus status={status} />
              </td>
              <td>{date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function RiskHeatmap() {
  // Likelihood (rows) x Impact (cols) matrix
  const likelihood = [
    "Almost Certain",
    "Likely",
    "Possible",
    "Unlikely",
    "Rare",
  ];
  const impact = [
    "Negligible",
    "Minor",
    "Moderate",
    "Major",
    "Catastrophic",
  ];

  // Heat colors Low (green), Medium (yellow), High (orange), Very High (red)
  const heatColors = {
    L: "#4caf50", // Low Green
    M: "#ffb300", // Medium Yellow
    H: "#f57c00", // High Orange
    V: "#d32f2f", // Very High Red
  };

  // Risk matrix hard-coded
  const matrix = [
    ["L", "L", "L", "L", "L"],
    ["L", "L", "L", "M", "M"],
    ["L", "L", "M", "M", "H"],
    ["L", "M", "M", "H", "H"],
    ["L", "M", "H", "H", "V"],
  ];

  return (
    <section className="heatmap-card" style={{ gridColumn: "span 2" }}>
      <h4>Risk Heatmap</h4>
      <p className="subtitle">Visual representation of inherent risks by likelihood and impact.</p>
      <div className="heatmap-wrapper">
        <table className="heatmap-table">
          <thead>
            <tr>
              <th></th>
              {impact.map((i) => (
                <th key={i}>{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {likelihood.map((lik, rowIdx) => (
              <tr key={lik}>
                <th className="heatmap-row-label">{lik}</th>
                {matrix[rowIdx].map((cell, colIdx) => (
                  <td
                    key={colIdx}
                    className="heatmap-cell"
                    style={{
                      backgroundColor: heatColors[cell],
                      color: "#fff",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="heatmap-legend">
          <div>
            <span className="legend-box" style={{backgroundColor: heatColors.L}}></span> Low
          </div>
          <div>
            <span className="legend-box" style={{backgroundColor: heatColors.M}}></span> Medium
          </div>
          <div>
            <span className="legend-box" style={{backgroundColor: heatColors.H}}></span> High
          </div>
          <div>
            <span className="legend-box" style={{backgroundColor: heatColors.V}}></span> Very High
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Dashboard() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumbs">Dashboard / Reports</div>
          <div className="search-section">
            <input
              type="search"
              placeholder="Search reports, controls..."
              className="search-input"
            />
          </div>
          <div className="topbar-actions">
            <button className="btn-primary">Share</button>
            <div className="avatar">CI</div>
          </div>
        </header>

        <section className="page-header">
          <h2>Program Overview</h2>
          <div className="filters">
            <button className="btn-filter">
              Last 30 days (Aug 11, 2024 - Sep 10, 2024) ▼
            </button>
            <button className="btn-filter">Framework ▼</button>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="overview-cards">
          <OverviewCard
            title="Compliance Score"
            value="92"
            change="5%"
            changeUp={true}
            description="Compared to the previous month"
          />
          <OverviewCard
            title="Open Risks"
            value="18"
            change="3"
            changeUp={false}
            description="Decrease from last week"
          />
          <OverviewCard
            title="Pending Audits"
            value="5"
            change="1"
            changeUp={true}
            description="New audits added this month"
          />
        </section>

        <TaskCompletion />

        <section className="charts-grid">
          <InherentRisk />
          <AssignedControls />
          <FrameworkProgress />
        </section>

        <Audits />
        <RecentActivities />
        <RiskHeatmap />

        <footer className="footer">
          © 2023 ComplianceIQ. All rights reserved.
        </footer>
      </main>

      {/* Styles */}
      <style jsx>{`
        /* Reset */
        * {
          box-sizing: border-box;
        }
        body,
        html,
        .app-container {
          margin: 0;
          padding: 0;
          height: 100vh;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background-color: #fff;
          color: #202124;
        }
        .app-container {
          display: flex;
          height: 100vh;
        }
        .sidebar {
          width: 220px;
          background: #f4f6f8;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #e0e0e0;
        }
        .logo {
          font-weight: 700;
          font-size: 1.25rem;
          color: #1a73e8;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-bottom: 1px solid #ddd;
          user-select: none;
        }
        .sidebar-item {
          padding: 0.85rem 1.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-weight: 600;
          transition: background-color 0.15s ease;
          color: #555;
          user-select: none;
        }
        .sidebar-item.active,
        .sidebar-item:hover {
          background: #e8f0fe;
          color: #1a73e8;
          font-weight: 700;
        }
        .icon {
          font-size: 1.25rem;
          width: 1.4rem;
          text-align: center;
        }
        main.main-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding: 1.5rem 2rem;
          background: #fff;
        }
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e0e0e0;
          color: #444;
        }
        .breadcrumbs {
          font-weight: 600;
          font-size: 0.9rem;
          color: #666;
          user-select: none;
        }
        .search-section {
          flex-grow: 1;
          max-width: 450px;
          position: relative;
        }
        .search-input {
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 0.5rem 0.75rem;
          font-size: 0.95rem;
          transition: border-color 0.15s ease;
        }
        .search-input:focus {
          outline: none;
          border-color: #1a73e8;
          box-shadow: 0 0 4px 1px #a0c4ff;
        }
        .topbar-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .btn-primary {
          background-color: #1a73e8;
          border: none;
          color: white;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.2s ease;
        }
        .btn-primary:hover {
          background-color: #155ab6;
        }
        .avatar {
          background-color: #1a73e8;
          color: white;
          font-weight: 700;
          font-size: 1rem;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: none;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 1rem 0 1.5rem 0;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .page-header h2 {
          margin: 0;
          font-weight: 700;
          font-size: 1.75rem;
        }
        .filters {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn-filter {
          border: 1px solid #ddd;
          background: #f9f9f9;
          padding: 0.4rem 0.75rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          user-select: none;
          transition: background-color 0.15s ease;
        }
        .btn-filter:hover {
          background-color: #e3ebfd;
          border-color: #a0c4ff;
        }

        /* Overview Cards Grid */
        .overview-cards {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        .overview-card {
          flex: 1;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 1.25rem 1.5rem;
          background: #fafafa;
          box-shadow: 0 0 6px rgb(0 0 0 / 0.06);
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          user-select: none;
        }
        .overview-value {
          font-size: 2.25rem;
          font-weight: 700;
          color: #202124;
        }
        .overview-change.up {
          color: #4caf50;
          font-weight: 700;
        }
        .overview-change.down {
          color: #d32f2f;
          font-weight: 700;
        }
        .overview-title {
          font-weight: 700;
          font-size: 1rem;
          margin-top: 8px;
          margin-bottom: 4px;
          color: #444;
        }
        .overview-description {
          font-size: 0.85rem;
          color: #777;
          user-select: text;
        }

        /* Task Completion */
        .task-completion {
          margin-bottom: 2rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 1.5rem;
          background: #fafafa;
          box-shadow: 0 0 6px rgb(0 0 0 / 0.06);
          user-select: none;
        }
        .task-completion h3 {
          margin-top: 0;
          font-weight: 700;
          margin-bottom: 0.1rem;
        }
        .subtitle {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 1.2rem;
        }
        .task-bars {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          user-select: text;
        }
        .task-bar-group {
          flex: 1;
          min-width: 200px;
        }
        .task-title {
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 6px;
          color: #333;
        }
        .task-percent {
          font-weight: 700;
          font-size: 1.15rem;
          color: #202124;
          margin-bottom: 6px;
        }
        .small-text {
          font-weight: 400;
          font-size: 0.75rem;
          color: #666;
          margin-left: 6px;
        }
        .progress-bar {
          width: 100%;
          height: 12px;
          background: #ddd;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 6px;
        }
        .progress-filled {
          height: 12px;
          border-radius: 8px 0 0 8px;
        }
        .bg-blue .progress-filled {
          background: #1976d2;
        }
        .bg-lightblue .progress-filled {
          background: #90caf9;
        }
        .change-up {
          color: #4caf50;
          font-weight: 600;
          font-size: 0.8rem;
        }
        .change-down {
          color: #d32f2f;
          font-weight: 600;
          font-size: 0.8rem;
        }

        /* Charts Grid */
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 2rem;
          margin-bottom: 2rem;
        }
        .chart-card {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 1rem 1.2rem 1.4rem;
          background: #fafafa;
          box-shadow: 0 0 7px rgb(0 0 0 / 0.04);
          user-select: none;
        }
        .chart-card h4 {
          margin: 0 0 0.4rem 0;
          font-weight: 700;
          font-size: 1.1rem;
          color: #202124;
        }

        /* Tables */
        .table-card {
          border: 1px solid #ddd;
          border-radius: 6px;
          background: #fafafa;
          box-shadow: 0 0 7px rgb(0 0 0 / 0.05);
          padding: 1rem 1.2rem;
          margin-bottom: 2rem;
          user-select: none;
        }
        .table-card h4 {
          margin-top: 0;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          user-select: text;
        }
        th,
        td {
          padding: 0.5rem 0.75rem;
          text-align: left;
          font-size: 0.9rem;
          border-bottom: 1px solid #ddd;
          color: #444;
          vertical-align: middle;
        }
        th {
          background: #f4f6f8;
          font-weight: 600;
          user-select: none;
        }

        /* Risk Heatmap */
        .heatmap-card {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 1rem 1.2rem 1.2rem;
          background: #fafafa;
          margin-bottom: 2rem;
          user-select: none;
          width: 100%;
          max-width: 960px;
        }
        .heatmap-wrapper {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          align-items: flex-start;
        }
        .heatmap-table {
          border-collapse: collapse;
          border: 1px solid #ddd;
          user-select: text;
        }
        .heatmap-table th,
        .heatmap-table td {
          border: 1px solid #ddd;
          padding: 8px 12px;
          font-weight: 600;
          font-size: 0.85rem;
          color: #202124;
        }
        .heatmap-row-label {
          background-color: #f9f9f9;
          user-select: none;
          white-space: nowrap;
          width: 140px;
        }
        .heatmap-cell {
          width: 38px;
          height: 32px;
          color: #fff;
          font-weight: 700;
          text-align: center;
          vertical-align: middle;
          border-radius: 4px;
        }
        .heatmap-legend {
          display: flex;
          flex-direction: column;
          gap: 8px;
          user-select: none;
          font-size: 0.9rem;
          color: #555;
          min-width: 100px;
        }
        .legend-box {
          width: 18px;
          height: 18px;
          border-radius: 3px;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
          box-shadow: 0 0 2px rgba(0,0,0,0.1);
        }

        /* Footer */
        .footer {
          text-align: center;
          padding: 1rem 0;
          border-top: 1px solid #eee;
          font-size: 0.8rem;
          color: #999;
          user-select: none;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .charts-grid {
            grid-template-columns: 1fr !important;
          }
          section.chart-card[style*="grid-column: span 2"] {
            grid-column: span 1 !important;
          }
          .table-card[style*="grid-column: span 2"] {
            grid-column: span 1 !important;
          }
          .heatmap-card[style*="grid-column: span 2"] {
            grid-column: span 1 !important;
          }
          .overview-cards {
            flex-direction: column;
          }
          .task-bars {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}