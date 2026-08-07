# Atlas HR — Attendance Management

Day 4, Task 3. HR can mark and manage daily attendance for each employee: Present, Absent, Half Day, or Work From Home (WFH), with different badge colours per status.

## Features

- Table columns: Employee ID, Employee Name, Department, Attendance Status, Action
- Each row has a status dropdown plus a **Mark Attendance** / **Update Attendance** button (the label switches automatically depending on whether that employee already has a status set) and a **Reset Attendance** button once marked
- Status badges are colour-coded: green (Present), red (Absent), amber (Half Day), indigo (WFH), grey (Not Marked)
- Marking the same employee twice isn't possible by design - once a status is set, the button relabels itself to "Update Attendance" instead of offering "Mark Attendance" again

## Folder structure

```
Task-9-Bharath/
├── index.html                # redirects to attendance.html
├── attendance.html
├── css/
│   ├── style.css             # common styles (colours, sidebar/topbar shell, buttons)
│   └── attendance.css        # table, status badges, action controls
├── js/
│   ├── script.js             # common JS (sidebar toggle)
│   └── attendance.js         # employee data + mark/update/reset logic
└── assets/
    ├── images/
    │   ├── logo.svg
    │   └── logo-light.svg
    ├── icons/
    └── fonts/
```

## Connects to

The sidebar now shows the full 11-module list (Dashboard, HR Dashboard, Employee Directory, Employee Management, Employee Profile, Attendance, Leave Request, Leave Approval, Payroll, CRM, Finance) - same as every other module page in this project. This page marks itself active for Attendance, and links out to the live version of every other module.

- Superseded by **Task-10-Bharath**, which adds a summary statistics dashboard on top of this same table

## Running locally

Open `index.html` (or `attendance.html` directly) with a local server such as VS Code's Live Server extension.