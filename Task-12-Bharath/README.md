# Atlas HR — Leave Approval Dashboard

Day 5, Task 2. HR-facing dashboard for reviewing and acting on leave requests.

## Features

- Table columns: Employee ID, Employee Name, Department, Leave Type, Total Days, Status, Actions
- **Approve** / **Reject** - only enabled while a request is Pending; disabled once decided
- **Cancel** - removes the request entirely, always available, asks for confirmation first
- Status badges: Pending (amber), Approved (green), Rejected (red)
- **Summary cards**: Pending Requests, Approved Leaves, Rejected Leaves - recalculated live after every action
- Reads from the **same `localStorage` data** that Task-11-Bharath's Leave Request form writes to (key: `atlasHR_leaveRequests`), so this table shows real submitted requests, not a separate dataset. If nothing's been submitted yet, it falls back to a small sample list so the page isn't empty on first visit.
- **Reset Demo Data** button - clears whatever's saved and reloads with the current sample data. Useful if you're seeing stale data left over from an earlier version of this project.

## Folder structure

```
Task-12-Bharath/
├── index.html                # redirects to leave-approval.html
├── leave-approval.html
├── css/
│   ├── style.css             # common styles (colours, sidebar/topbar shell, buttons)
│   └── leave-approval.css    # summary cards, table, badges, action buttons
├── js/
│   ├── script.js             # common JS (sidebar toggle)
│   └── leave-approval.js     # reads/writes atlasHR_leaveRequests + Approve/Reject/Cancel logic
└── assets/
    ├── images/
    │   ├── logo.svg
    │   └── logo-light.svg
    ├── icons/
    └── fonts/
```

## Connects to

- **Leave Request** (in the sidebar) → `../Task-11-Bharath/leave-management.html`
- Same full 11-module sidebar as every other module page in this project (Dashboard, HR Dashboard, Employee Directory, Employee Management, Employee Profile, Attendance, Leave Request, Leave Approval, Payroll, CRM, Finance)

## Running locally

Open `index.html` (or `leave-approval.html` directly) with a local server such as VS Code's Live Server extension.

For the most realistic demo: open `Task-11-Bharath/leave-management.html` first, submit a request, then open this page - your real request appears in the table alongside the sample data.