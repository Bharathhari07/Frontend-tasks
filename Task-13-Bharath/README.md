# Atlas HR — HR Dashboard

Day 5, Task 3. A real-time overview dashboard, combining data from Employee Management, Attendance and Leave into one view.

## Features

- **Stat cards**: Total Employees, Present Today, Employees on Leave, Pending Leave Requests, Departments, Active Employees - all calculated live from real data
- **Recent Activities** table: a combined feed of recently added employees, latest leave requests, and attendance updates
- This page reads (never writes) three `localStorage` keys: `atlasHR_employees`, `atlasHR_attendance`, `atlasHR_leaveRequests` - the same ones Employee Management, Attendance and Leave already maintain, so nothing here is a separate or fabricated dataset

## Folder structure

```
Task-13-Bharath/
├── index.html                # redirects to hr-dashboard.html
├── hr-dashboard.html
├── css/
│   ├── style.css             # common styles (colours, sidebar/topbar shell, buttons)
│   └── hr-dashboard.css      # stat card grid, activity table
├── js/
│   ├── script.js             # common JS (sidebar toggle)
│   └── hr-dashboard.js       # reads all three data sources + calculates stats
└── assets/
    ├── images/
    │   ├── logo.svg
    │   └── logo-light.svg
    ├── icons/
    └── fonts/
```

## Connects to

- **Dashboard** (in the sidebar) → `../Task-3-Bharath/dashboard.html` (the main navigation hub)
- **Employee Management**, **Attendance**, **Leave Request**, **Leave Approval**, **Employee Profile** - the pages this dashboard's numbers are built from
- Same full 11-module sidebar as every other module page in this project

## Running locally

Open `index.html` (or `hr-dashboard.html` directly) with a local server such as VS Code's Live Server extension.

For the most realistic demo: add an employee via Task-6, mark attendance via Task-10, and submit/approve a leave request via Task-11/12 first - the numbers here update to reflect it.