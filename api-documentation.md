# Job Board API Documentation

## Authentication Endpoints

### Register User
- **POST** `/api/auth/register`
- **Body**: 
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```
- **Response**: 
```json
{
  "id": 1,
  "email": "john@example.com"
}
```

### Login
- **POST** `/api/auth/login`  
- **Body**: 
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```
- **Response**: 
```json
{
  "id": 1,
  "email": "john@example.com"
}
```

### Logout
- **POST** `/api/auth/logout`
- **Response**: 
```json
{
  "message": "Logged out successfully"
}
```

### Get Current User
- **GET** `/api/auth/me`
- **Response**: 
```json
{
  "id": 1,
  "email": "john@example.com"
}
```

## Job Endpoints

### Get All Jobs
- **GET** `/api/jobs`
- **Response**: 
```json
[
  {
    "id": 1,
    "title": "Senior Software Engineer",
    "type": "Full-time",
    "salary": 120000,
    "description": "Join our engineering team to build scalable solutions...",
    "date": "2024-03-15T08:00:00.000Z",
    "skills": "React, Node.js, PostgreSQL",
    "picture": "https://company.com/logo.png"
  },
  {
    "id": 2,
    "title": "UX Designer",
    "type": "Contract",
    "salary": 90000,
    "description": "Looking for a creative designer to join our product team...",
    "date": "2024-03-14T10:30:00.000Z",
    "skills": "Figma, User Research, Design Systems",
    "picture": null
  }
]
```

### Create Job
- **POST** `/api/jobs`
- **Auth**: Required
- **Body**:
```json
{
  "title": "Frontend Developer",
  "type": "Full-time",
  "salary": 85000,
  "description": "Join our growing team of frontend developers...",
  "skills": "React, TypeScript, CSS",
  "picture": "https://company.com/frontend-team.jpg",
  "date": "2024-03-16T00:00:00.000Z"
}
```
- **Response**: 
```json
{
  "id": 3,
  "title": "Frontend Developer",
  "type": "Full-time",
  "salary": 85000,
  "description": "Join our growing team of frontend developers...",
  "skills": "React, TypeScript, CSS",
  "picture": "https://company.com/frontend-team.jpg",
  "date": "2024-03-16T00:00:00.000Z",
  "userId": 1
}
```

### Get My Jobs
- **GET** `/api/my-jobs`
- **Auth**: Required
- **Response**: 
```json
[
  {
    "id": 1,
    "title": "Senior Software Engineer",
    "type": "Full-time",
    "salary": 120000,
    "description": "Join our engineering team...",
    "date": "2024-03-15T08:00:00.000Z",
    "skills": "React, Node.js, PostgreSQL",
    "picture": "https://company.com/logo.png",
    "userId": 1
  }
]
```

### Delete Job
- **DELETE** `/api/my-jobs`
- **Auth**: Required
- **Body**: 
```json
{
  "job_id": 1
}
```
- **Response**: 
```json
{
  "message": "Job successfully deleted"
}
```

## Application Endpoints

### Get Applications
- **GET** `/api/applications`
- **Auth**: Required
- **Response**: 
```json
[
  {
    "id": 1,
    "name": "Sarah Johnson",
    "email": "sarah@example.com",
    "photo": "https://example.com/sarah.jpg",
    "cv": "5 years of frontend development experience...",
    "job_id": 1,
    "job": {
      "id": 1,
      "title": "Senior Software Engineer",
      "type": "Full-time",
      "salary": 120000
    }
  }
]
```

### Submit Application
- **POST** `/api/applications`
- **Body**:
```json
{
  "job_id": 1,
  "name": "Sarah Johnson",
  "email": "sarah@example.com",
  "photo": "https://example.com/sarah.jpg",
  "cv": "5 years of frontend development experience..."
}
```
- **Response**: 
```json
{
  "id": 1,
  "name": "Sarah Johnson",
  "email": "sarah@example.com",
  "photo": "https://example.com/sarah.jpg",
  "cv": "5 years of frontend development experience...",
  "job_id": 1
}
```

## General Notes

- All endpoints return appropriate HTTP status codes
- Authentication is handled via HTTP-only cookies
- Error responses follow format: `{ "error": "Error message here" }`
- CORS is enabled for `http://localhost:5000`
- All dates are in ISO format
- All endpoints include appropriate error handling for:
  - Invalid data
  - Authentication failures
  - Resource not found
  - Server errors
