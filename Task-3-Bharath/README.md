# Atlas HR — Login & Dashboard

Day 2, Task 1. Enterprise login page (simulated, no backend — Employee ID `admin`, Password `admin123`) that redirects into a dashboard with navigation cards for each HRMS module.

## Folder structure

```
Task-3-Bharath/
├── index.html          # redirects to login.html (fixes Live Server directory listing)
├── login.html
├── dashboard.html
├── css/
│   ├── login.css
│   └── dashboard.css
├── js/
│   ├── login.js
│   ├── dashboard.js
│   └── pages.js         # shared sidebar toggle / logout for the module pages
├── assets/
│   ├── images/
│   │   ├── logo.svg        # dark wordmark, used on the white login card
│   │   └── logo-light.svg  # light wordmark, used on the navy sidebar
│   ├── icons/
│   └── fonts/
└── pages/
    ├── employee-management.html  # placeholder - superseded by Task-6-Bharath
    ├── attendance.html
    ├── leave.html
    ├── payroll.html
    ├── crm.html
    └── finance.html
```

## Connects to

- Dashboard's **HR Dashboard** card/sidebar link → `../Task-13-Bharath/hr-dashboard.html`
- Dashboard's **Employee Directory** card/sidebar link → `../Task-8-Bharath/employee-directory.html`
- Dashboard's **Employee Management** card/sidebar link → `../Task-6-Bharath/employee-management.html`
- Dashboard's **Employee Profile** card/sidebar link → `../Task-14-Bharath/employee-profile.html`
- Dashboard's **Attendance** card/sidebar link → `../Task-10-Bharath/attendance.html`
- Dashboard's **Leave Request** card/sidebar link → `../Task-11-Bharath/leave-management.html`
- Dashboard's **Leave Approval** card/sidebar link → `../Task-12-Bharath/leave-approval.html`
- **← Back to Home** on the login page → `../Task-1/index.html`
- Other dashboard cards (Payroll, CRM, Finance) → internal placeholder pages in `pages/`

## Running locally

Open `index.html` (or `login.html` directly) with a local server such as VS Code's Live Server extension.