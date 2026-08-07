# Atlas HR

A simple HR management system, built module by module with plain HTML, CSS and JavaScript. No backend or database - each module stores its data in a JavaScript array that resets when the page reloads.

## Modules

- **Employee Management** (`employee-management.html`) - add employees through a form and view them in a table (Create & Read).

## Folder structure

```
Task-5-Bharath/
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
│   └── employee.js           # employee-management.html Create/Read logic
│
└── README.md
```

## Connects to

The sidebar now shows the full 11-module list (Dashboard, HR Dashboard, Employee Directory, Employee Management, Employee Profile, Attendance, Leave Request, Leave Approval, Payroll, CRM, Finance) - same as every other module page in this project. This page marks itself active for Employee Management, and links out to the live version of every other module.

- Superseded by **Task-6-Bharath**, which has the full Create/Read/Update/Delete version of this module

## Running locally

Open `index.html` (or `employee-management.html` directly) with a local server such as VS Code's Live Server extension.