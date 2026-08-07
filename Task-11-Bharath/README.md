# Atlas HR — Employee Leave Request Portal

Day 5, Task 1. Employees can submit a leave request through a validated form. Requests are stored in a local JavaScript array and shown in a table below the form as they're added.

## Features

- Fields: Employee ID, Employee Name, Department, Leave Type (Casual/Sick/Earned/Maternity), From Date, To Date, Reason
- **Validation**: Employee ID must be numeric, Name letters-only, all fields required
- **Automatic day calculation**: Total Leave Days fills in on its own as soon as both dates are picked
- **Date guard**: To Date can never be set earlier than From Date (blocked both at pick-time and again on submit)
- **Success message** shown after a valid submission
- Submitted requests render dynamically in a table below the form
- Requests are saved to `localStorage` (key: `atlasHR_leaveRequests`), so **Task-12-Bharath's** Leave Approval Dashboard can read the real requests you've submitted, not a separate copy

## Folder structure

```
Task-11-Bharath/
├── index.html                # redirects to leave-management.html
├── leave-management.html
├── css/
│   ├── style.css             # common styles (colours, sidebar/topbar shell, buttons)
│   └── leave.css             # form + table styling
├── js/
│   ├── script.js             # common JS (sidebar toggle)
│   └── leave.js              # leaveRequests array + validation + day calculation
└── assets/
    ├── images/
    │   ├── logo.svg
    │   └── logo-light.svg
    ├── icons/
    └── fonts/
```

## Connects to

Same full 11-module sidebar as every other module page in this project (Dashboard, HR Dashboard, Employee Directory, Employee Management, Employee Profile, Attendance, Leave Request, Leave Approval, Payroll, CRM, Finance).

- Continues into **Task-12-Bharath**, the HR-facing Leave Approval Dashboard, which uses the same request data shape

## Running locally

Open `index.html` (or `leave-management.html` directly) with a local server such as VS Code's Live Server extension.