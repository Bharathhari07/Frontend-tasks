# Atlas HR — Attendance Summary Dashboard

Day 4, Task 4. Continues Task-9-Bharath's attendance table, adding a live summary dashboard on top.

## Features

- **Summary cards**: Total Employees, Present, Absent, Half Day, Work From Home - these always reflect every employee, regardless of any active search/filter
- **Current date** displayed in the topbar
- **Search** by Employee Name or Employee ID
- **Filter** by Department and by Attendance Status (including "Not Marked")
- Mark / Update / Reset attendance works the same as Task-9, but is now safe to use while a search or filter is active - each control is tied to the employee's actual ID rather than its row position, so filtering never mixes up which person gets updated

## Folder structure

```
Task-10-Bharath/
├── index.html                # redirects to attendance.html
├── attendance.html
├── css/
│   ├── style.css             # common styles (colours, sidebar/topbar shell, buttons)
│   └── attendance.css        # table, badges, summary cards, controls row
├── js/
│   ├── script.js             # common JS (sidebar toggle)
│   └── attendance.js         # employee data + summary + search/filter + mark/update/reset
└── assets/
    ├── images/
    │   ├── logo.svg
    │   └── logo-light.svg
    ├── icons/
    └── fonts/
```

## Connects to

The sidebar shows the full 11-module list (Dashboard, HR Dashboard, Employee Directory, Employee Management, Employee Profile, Attendance, Leave Request, Leave Approval, Payroll, CRM, Finance) - same as every other module page in this project. This is the **live** Attendance page, linked to from the dashboard's own card/sidebar too.

Every mark, update and reset is saved to `localStorage` (key: `atlasHR_attendance`), so the **HR Dashboard** (Task-13-Bharath) and **Employee Profile** (Task-14-Bharath) can read real attendance records instead of a separate, disconnected dataset.

## Running locally

Open `index.html` (or `attendance.html` directly) with a local server such as VS Code's Live Server extension.