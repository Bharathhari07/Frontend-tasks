# Frontend-tasks — Atlas HR / One Enterprise Cloud

This repo holds one growing project, submitted incrementally as daily tasks. Each `Task-N` folder is a real, working piece of the same product — not a separate standalone app. The folders are linked together so the whole thing can be clicked through end to end, starting from `Task-1`.

## How it's connected

**Every module page (the dashboard and every page in Task-3 through Task-14) shares the exact same 11-link sidebar**, so you can jump to any module from anywhere in the app:

```
Dashboard            → Task-3-Bharath/dashboard.html
HR Dashboard         → Task-13-Bharath/hr-dashboard.html
Employee Directory   → Task-8-Bharath/employee-directory.html
Employee Management  → Task-6-Bharath/employee-management.html
Employee Profile     → Task-14-Bharath/employee-profile.html
Attendance           → Task-10-Bharath/attendance.html
Leave Request        → Task-11-Bharath/leave-management.html
Leave Approval       → Task-12-Bharath/leave-approval.html
Payroll              → Task-3-Bharath/pages/payroll.html
CRM                  → Task-3-Bharath/pages/crm.html
Finance              → Task-3-Bharath/pages/finance.html
```

The one exception is each page marking *itself* as the active sidebar item — so on `Task-5-Bharath`, "Employee Management" is active (self-link) even though the *live* version is Task-6; same idea for Task-4/7/9 pointing at their own older selves while still linking out to every other module's current version.

## Real shared data via localStorage

Starting Day 5, three modules actually share live data through the browser's `localStorage` (same origin, so it works across separate HTML pages with no backend):

| localStorage key | Written by | Read by |
|---|---|---|
| `atlasHR_employees` | Task-6-Bharath (Employee Management) | Task-13-Bharath, Task-14-Bharath |
| `atlasHR_attendance` | Task-10-Bharath (Attendance) | Task-13-Bharath, Task-14-Bharath |
| `atlasHR_leaveRequests` | Task-11-Bharath (Leave Request), Task-12-Bharath (Leave Approval) | Task-12-Bharath, Task-13-Bharath, Task-14-Bharath |

Every page falls back to a small seeded sample if nothing's been saved yet, so nothing looks empty on first visit — but the numbers are real once you've actually added an employee, marked attendance, or submitted/approved a leave request.

Beyond the shared sidebar and shared data, here's the rest of the flow:

```
Task-1 (landing page)
   ├─ Login button    → Task-3-Bharath/login.html
   ├─ Get Started      → Task-2/index.html
   └─ Register button → Task-2/index.html

Task-2 (employee registration)
   ├─ Back to Home        → Task-1/index.html
   └─ Already registered? → Task-3-Bharath/login.html

Task-3-Bharath/login.html
   ├─ Back to Home → Task-1/index.html
   └─(correct credentials: admin / admin123)--> dashboard.html
```

## Folder guide

| Folder | What it is |
|---|---|
| `Task-1` | Day 1, Task 1 — landing page |
| `Task-2` | Day 1, Task 2 — employee registration form |
| `Task-3-Bharath` | Day 2, Task 1 — login page + dashboard shell (holds the placeholder pages for Payroll, CRM, Finance too) |
| `Task-4-Bharath` | Day 2, Task 2 — employee directory with search/filter. Superseded by Task-8-Bharath. |
| `Task-5-Bharath` | Assessment — employee management (Create & Read only). Superseded by Task-6-Bharath. |
| `Task-6-Bharath` | Assessment — employee management (full Create/Read/Update/Delete). **Live version.** Writes `atlasHR_employees`. |
| `Task-7-Bharath` | Day 4, Task 1 — employee directory, card view. Superseded by Task-8-Bharath. |
| `Task-8-Bharath` | Day 4, Task 2 — employee directory, card view + search/filter/sort/reset. **Live version.** |
| `Task-9-Bharath` | Day 4, Task 3 — attendance management (mark/update/reset). Superseded by Task-10-Bharath. |
| `Task-10-Bharath` | Day 4, Task 4 — attendance management + summary dashboard + search/filter. **Live version.** Writes `atlasHR_attendance`. |
| `Task-11-Bharath` | Day 5, Task 1 — leave request form with validation and auto day-count. Writes `atlasHR_leaveRequests`. |
| `Task-12-Bharath` | Day 5, Task 2 — HR leave approval dashboard (Approve/Reject/Cancel). Reads and updates `atlasHR_leaveRequests`. |
| `Task-13-Bharath` | Day 5, Task 3 — HR Dashboard, real-time stats combining all three data sources. |
| `Task-14-Bharath` | Day 5, Task 4 — one employee's full profile, reports, and leave history, combining all three data sources. |

Older/superseded folders are kept as a record of that day's submission — nothing is deleted, and every one of them still has working navigation to the rest of the app.

## Running locally

Each folder is self-contained enough to open with Live Server on its own, but the intended experience is to start at `Task-1/index.html` and click through — Login, Register, Dashboard, and every module all connect to each other via relative links.

Demo login credentials (`Task-3-Bharath/login.html`): Employee ID `admin`, Password `admin123`.

For the fullest demo of the shared data: add an employee via Task-6, mark their attendance via Task-10, submit a leave request for them via Task-11, then approve it via Task-12 — then check Task-13's HR Dashboard and Task-14's Employee Profile to see it all reflected live.