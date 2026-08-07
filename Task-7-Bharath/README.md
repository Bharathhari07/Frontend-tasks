# Atlas HR — Employee Directory (Card View)

Day 4, Task 1. Extends the Employee Management module with a card-based directory view. Each card shows a photo placeholder (coloured initials), Employee ID, Name, Department, Designation, Email, and Status (Active/Inactive). Local JavaScript array, no backend/API. Responsive grid: 4 columns on desktop, down to 1 on mobile.

## Folder structure

```
Task-7-Bharath/
├── index.html                # redirects to employee-directory.html
├── employee-directory.html
├── css/
│   ├── style.css             # common styles (colours, sidebar/topbar shell, buttons)
│   └── directory.css         # card grid + photo placeholder + badges
├── js/
│   ├── script.js             # common JS (sidebar toggle)
│   └── directory.js          # employee data + card rendering
└── assets/
    ├── images/
    │   ├── logo.svg
    │   └── logo-light.svg
    ├── icons/
    └── fonts/
```

## Connects to

The sidebar now shows the full 11-module list (Dashboard, HR Dashboard, Employee Directory, Employee Management, Employee Profile, Attendance, Leave Request, Leave Approval, Payroll, CRM, Finance) - same as every other module page in this project. This page marks itself active for Employee Directory, and links out to the live version of every other module.

- Superseded by **Task-8-Bharath**, which adds Search, Filter and Sort on top of this same card view

## Running locally

Open `index.html` (or `employee-directory.html` directly) with a local server such as VS Code's Live Server extension.