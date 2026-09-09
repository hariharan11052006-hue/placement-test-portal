# Placement Drive Management Portal

## Client requirements

Placement teams need one place to publish campus drives, define eligibility, review registrations and record outcomes. Students need a responsive portal to discover eligible drives, register before the deadline and track whether they are registered, shortlisted, selected or rejected.

The system should use a hosted database in production, protect credentials, validate every input, support role-based administration and remain usable on mobile devices.

## Functional requirements

1. Students can create an account with academic profile data (department, year and CGPA), sign in and sign out.
2. Administrators can create, update and archive placement drives.
3. A drive stores company, role, location, dates, description, minimum CGPA, eligible departments and eligible years.
4. Users can search drives and filter them by department and year.
5. The API checks eligibility and registration deadlines before creating a registration.
6. A student can register only once for a drive and can view all personal registrations.
7. Administrators can update a registration status to registered, shortlisted, selected or rejected.
8. The backend uses MongoDB when `MONGODB_URI` is configured and a local JSON store for development fallback.
9. Passwords are salted and hashed with PBKDF2; API payloads are validated and sensitive password fields are never returned.

## Non-functional requirements

- Responsive UI for mobile, tablet and desktop.
- Server-side validation for all mutations.
- Stable JSON API responses with actionable HTTP errors.
- Indexed cloud collections should be added before production scale-up (see `drives` by `driveDate` and `registrations` by `driveId`/`username`).
- Production deployment uses Render and environment variables; no credentials are committed.

## Development flow

Requirements -> FRD -> ER/data model -> UI -> frontend -> backend/API -> cloud database -> integration -> testing -> security -> optimization -> deployment.
