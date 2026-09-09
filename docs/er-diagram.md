# ER diagram and data model

```mermaid
erDiagram
  USERS ||--o{ REGISTRATIONS : submits
  DRIVES ||--o{ REGISTRATIONS : receives
  USERS ||--o{ TEST_HISTORY : records

  USERS {
    string username PK
    string fullName
    string registerNumber
    string department
    string year
    number cgpa
    string role
    string passwordHash
    string salt
  }
  DRIVES {
    string id PK
    string title
    string company
    string location
    date driveDate
    date deadline
    number minCgpa
    string[] eligibleDepartments
    string[] eligibleYears
    string status
    string createdBy FK
  }
  REGISTRATIONS {
    string id PK
    string driveId FK
    string username FK
    string status
    date createdAt
    date updatedAt
  }
  TEST_HISTORY {
    string username FK
    object[] entries
  }
```

MongoDB collections are `users`, `drives`, `registrations`, `history` and `accessRequests`. The application uses MongoDB Atlas through `MONGODB_URI`; local development falls back to `data/app-db.json`.
