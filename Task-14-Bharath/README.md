# Atlas HR — Employee Profile & Reports

Day 5, Task 4. A single employee's full profile, combining real data from Employee Management, Attendance and Leave into one view - no separate dataset of its own.

## Features

- **Employee selector** - a dropdown at the top lists every real employee from Employee Management; picking one re-renders the whole profile for that person. Not fixed to a single employee.
- **Employee Details**: ID, Name, Department, Designation, Email, Phone Number, Joining Date, Attendance Percentage, Leave Balance
- **Reports section**: Total Working Days, Present Days, Leave Days, Attendance Percentage
- **Leave History** table, built from this employee's real leave requests
- **Print Profile** button (`window.print()`) - a dedicated print stylesheet hides the sidebar, topbar, selector and buttons so only the profile content prints
- **Download Profile** button - UI only, as specified; clicking it shows a message explaining it's a demo button rather than silently doing nothing

## How the reports are calculated

This project's Attendance module only tracks a single "today" status per employee, not a full historical daily log, so the reports use two declared constants combined with real leave data rather than inventing a fake attendance history:

- `WORKING_DAYS_PER_MONTH = 22` and `ANNUAL_LEAVE_ALLOTMENT = 24` - standard company-policy figures, not employee-specific data
- **Leave Days** - real: the sum of `totalDays` across this employee's *Approved* leave requests
- **Present Days** = Working Days − Leave Days (assumes every working day that wasn't approved leave was a present day)
- **Attendance Percentage** = Present Days ÷ Working Days

Phone Number and Joining Date aren't tracked anywhere else in this project, so a small two-field lookup fills in just those for the one profiled employee - not a parallel employee dataset.

## Folder structure

```
Task-14-Bharath/
├── index.html                # redirects to employee-profile.html
├── employee-profile.html
├── css/
│   ├── style.css             # common styles (colours, sidebar/topbar shell, buttons)
│   └── profile.css           # profile header, details grid, reports, history table, print styles
├── js/
│   ├── script.js             # common JS (sidebar toggle)
│   └── profile.js            # combines all three data sources + reports + print/download
└── assets/
    ├── images/
    │   ├── logo.svg
    │   └── logo-light.svg
    ├── icons/
    └── fonts/
```

## Connects to

- **HR Dashboard**, **Employee Management**, **Attendance**, **Leave Request**, **Leave Approval** - the pages this profile's data comes from
- Same full 11-module sidebar as every other module page in this project

## Running locally

Open `index.html` (or `employee-profile.html` directly) with a local server such as VS Code's Live Server extension.