# Atlas HR

A simple HR management system, built module by module with plain HTML, CSS and JavaScript. No backend or database - each module stores its data in a JavaScript array that resets when the page reloads.

## Modules

- **Employee Management** (`employee-management.html`) - add, view, edit and delete employees through a form and table (Create, Read, Update & Delete). Also shows a live total employee count.

## Folder structure

```
Task-6-Bharath/
├── index.html                # redirects straight to employee-management.html
├── employee-management.html  # Employee Management module
│
├── assets/
│   ├── images/                # logo files
│   ├── icons/
│   └── fonts/
│
├── css/
│   ├── style.css             # common styles (colours, sidebar/topbar shell, buttons)
│   └── employee.css          # employee-management.html specific styles
│
├── js/
│   ├── script.js             # common JS (sidebar toggle)
│   └── employee.js           # employee-management.html CRUD logic
│
└── README.md
```

## Connects to

The sidebar shows the full 11-module list (Dashboard, HR Dashboard, Employee Directory, Employee Management, Employee Profile, Attendance, Leave Request, Leave Approval, Payroll, CRM, Finance) - same as every other module page in this project. This is the **live** Employee Management page, linked to from the dashboard's own card/sidebar too.

Every add, update and delete is saved to `localStorage` (key: `atlasHR_employees`), so the **HR Dashboard** (Task-13-Bharath) and **Employee Profile** (Task-14-Bharath) can read real employee records instead of a separate, disconnected dataset. On first visit (before anything's been saved), this page starts with the same 10 sample employees used across Attendance and the Employee Directory, so every page stays consistent from the start.

## Running locally

Open `index.html` (or `employee-management.html` directly) with a local server such as VS Code's Live Server extension.