# Test Case Document - Mentor-Pro

## 1. Unit Tests (Automated)

These tests are executed using Jest. Run `npm test` to execute them.

| Test ID | Module | Case Description | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **UT-01** | `AddMentoring` | Create mentoring record with valid data. | Record is created in DB; User redirected. | ✅ Pass |
| **UT-02** | `AddMentoring` | Create record without `NextMentoringDate`. | Record created with `null` next date. | ✅ Pass |
| **UT-03** | `manageStudent` | Assign students to a mentor (Transaction). | Old assignments deleted; new ones created. | ✅ Pass |
| **UT-04** | `manageStudent` | Handle database connection error. | Error logged; User redirected gracefully. | ✅ Pass |

## 2. Dashboard & UI (Manual)

| Test ID | Feature | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **UI-01** | **Reminders** | 1. Login as Admin/Staff.<br>2. Ensure a student has `NextMentoringDate` within 7 days.<br>3. View Dashboard. | "Upcoming Mentoring Sessions" card appears with student name and countdown. |
| **UI-02** | **Reminders** | 1. Ensure NO students have upcoming dates.<br>2. View Dashboard. | The Reminders card should NOT be visible. |
| **UI-03** | **Navigation** | 1. Click "Student Directory" card.<br>2. Click "Back" or Home logo. | Navigates to correct routes (`/students`, `/`). |

## 3. Server Actions & Error Handling (Manual/Integration)

| Test ID | Feature | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **INT-01** | **Add Mentoring** | 1. Go to Mentoring Form.<br>2. Submit form with file attachment. | File saved in `/uploads`; Record points to file path. |
| **INT-02** | **Unique Constraint** | 1. Attempt to create a record that violates a unique constraint (if applicable). | System logs specific `P2002` error; UI handles gracefully (redirects for now). |
| **INT-03** | **Invalid Data** | 1. Submit form with missing required fields (bypass client validation). | Server action throws/logs error; Database integrity maintained. |

## 4. Deployment

| Test ID | Environment | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **DEP-01** | **Vercel** | 1. Push code to `main`.<br>2. Wait for Vercel build. | Build succeeds; Site is live at public URL. |
