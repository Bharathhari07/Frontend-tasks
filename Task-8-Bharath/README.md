# Atlas HR — Employee Directory (Search, Filter & Sort)

Day 4, Task 2. Continues Task-7-Bharath's card-based directory, adding search, three filter dropdowns, sorting, and a reset button.

## Features

- **Search** by Employee Name or Employee ID
- **Filter** by Department, Designation (built dynamically from the data), and Status
- **Sort** by Name (A-Z / Z-A) or Employee ID (Ascending / Descending)
- **Reset Filters** button restores the full, unfiltered, unsorted list

## Folder structure

```
Task-8-Bharath/
├── index.html                # redirects to employee-directory.html
├── employee-directory.html
├── css/
│   ├── style.css             # common styles (colours, sidebar/topbar shell, buttons)
│   └── directory.css         # card grid, controls row, badges
├── js/
│   ├── script.js             # common JS (sidebar toggle)
│   └── directory.js          # employee data + search/filter/sort/reset logic
└── assets/
    ├── images/
    │   ├── logo.svg
    │   └── logo-light.svg
    ├── icons/
    └── fonts/
```

## Connects to

The sidebar shows the full 11-module list (Dashboard, HR Dashboard, Employee Directory, Employee Management, Employee Profile, Attendance, Leave Request, Leave Approval, Payroll, CRM, Finance) - same as every other module page in this project. This is the **live** Employee Directory page, linked to from the dashboard's own card/sidebar too.

## Running locally

Open `index.html` (or `employee-directory.html` directly) with a local server such as VS Code's Live Server extension.