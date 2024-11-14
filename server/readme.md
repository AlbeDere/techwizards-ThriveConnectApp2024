# ThriveConnectApp Documentation

## Table of Contents

1. [Overview](#overview)
2. [Environment Setup](#environment-setup)
3. [Project Structure](#project-structure)
4. [Routes](#routes)
5. [Services](#services)
6. [Database Setup](#database-setup)
7. [Starting the Application](#starting-the-application)
8. [Error Handling](#error-handling)
9. [Dockerize] (#dockerize)

---

## Overview

**ThriveConnectApp** is a Node.js and Express-based API that facilitates connections between job seekers and companies. It incorporates features for authentication, profile management, feedback, and matching services utilizing MongoDB and change streams to monitor and respond to database events in real-time.

## Environment Setup

Ensure you have the following environment variables in your `.env` file:

```plaintext
PORT=3003
MONGO_DB_URL=<your_mongo_db_url>
JWT_SECRET=<your_jwt_secret>
```

These values are essential for MongoDB connection, JWT authentication, and server configuration.

## Project Structure

```plaintext
src/
├── app.ts                 # Express app setup and middleware configuration
├── servers.ts             # Server start logic and change stream listeners
├── routes/                # API routes
│   ├── authRoutes.ts
│   ├── companyRoutes.ts
│   ├── jobSeekerRoutes.ts
│   └── feedbackRoutes.ts
├── controllers/           # Route controllers
│   ├── authController.ts
│   ├── companyControllers.ts
│   ├── jobSeekerControllers.ts
│   └── feedbackController.ts
├── services/              # Service logic for business operations
│   ├── authServices.ts
│   ├── companyServices.ts
│   ├── jobSeekerServices.ts
│   └── feedbackServices.ts
├── models/                # Models
│   ├── companyModel.ts
│   ├── jobSeekerModel.ts
│   └── feedbackModel.ts
├── interfaces/            # TypeScript interfaces for data models
│   ├── ICompaany.ts
│   ├── IFeedback.ts
│   └── IJobSeeker.ts
├── errors/                # Custom error classes
│   └── ApiError.ts
└── middleware/            # Custom middleware
│   ├── authMiddleware.ts
│   ├── errorMiddleware.ts
│   └── tokenMiddleware.ts
├── langchain/            # TypeScript interfaces for data models
    ├── agents/
    │   ├── agents.ts     # Matching agent
    │   └── matchingTypes.ts    # Types for matching
    ├── prompts/
    │   └── prompts.tx    # Prompts for LLM
    └── summaries/
        ├── summarizeCompany.ts     # Writes a summary for company
        └── summarizeJobseeker.ts   # Writes a summart for jobseeker
```

## Routes

### Authentication Routes (`authRoutes.ts`)

- **POST /api/v1/auth/login**
  Authenticates a user (either job seeker or company) and returns a JWT.

### Company Routes (`companyRoutes.ts`)

- **POST /api/v1/companies**Create a new company profile.
- **GET /api/v1/companies**Retrieve all companies.
- **GET /api/v1/companies/:id**Get details of a specific company by ID.
- **PUT /api/v1/companies/:id**Update a company's profile.
- **DELETE /api/v1/companies/:id**
  Delete a company by ID.

### Job Seeker Routes (`jobSeekerRoutes.ts`)

- **POST /api/v1/jobseekers**Register a new job seeker profile.
- **GET /api/v1/jobseekers**Retrieve all job seekers.
- **GET /api/v1/jobseekers/:id**Get details of a specific job seeker by ID.
- **PATCH /api/v1/jobseekers/:id**Update a job seeker’s profile.
- **DELETE /api/v1/jobseekers/:id**
  Delete a job seeker profile by ID.

### Feedback Routes (`feedbackRoutes.ts`)

- **POST /api/v1/feedback/:companyId**
  Submit feedback for a specific company.

## Services

Each service handles the core logic for various parts of the application.

### `authServices.ts`

- **authenticateUser(email, password, role)**: Verifies user credentials and returns a JWT if successful.

### `companyServices.ts`

- **createCompany(companyData)**: Creates a new company profile, generates embeddings, and stores them.
- **getCompanyById(id)**: Fetches a company by ID.
- **updateCompanyProfile(id, updatedCompanyData)**: Updates an existing company profile with new details.
- **deleteCompanyById(id)**: Deletes a company by its ID.
- **fetchAllCompanies()**: Retrieves all companies.

### `jobSeekerServices.ts`

- **createJobSeeker(jobSeekerData)**: Registers a new job seeker, generates embeddings, and stores them.
- **getAllJobSeekers()**: Retrieves all job seekers.
- **getJobSeekerById(id)**: Fetches a job seeker by ID.
- **updateJobSeekerById(id, updatedJobSeekerData)**: Updates a job seeker’s profile.
- **deleteJobSeekerById(id)**: Deletes a job seeker by ID.

### `feedbackServices.ts`

- **addFeedback(companyId, feedbackData)**: Adds feedback to a specific company, updates company’s feedback list.

## Database Setup

The application uses MongoDB, with Mongoose models defined for each main entity:

- `CompanyModel`
- `JobSeekerModel`
- `FeedbackModel`

### Change Stream Monitoring

In `servers.ts`, MongoDB change streams are initialized to monitor the `companies` and `jobseekers` collections. Whenever a new document is added to these collections, a job-matching analysis is triggered through `JobMatchingAgent`.

## Starting the Application

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the MongoDB server locally or use a remote MongoDB URL.
3. Start the application:

   ```bash
   npm run start
   ```

   The server will run on the port specified in the `.env` file (default: `3003`).

## Error Handling

- **Global Error Middleware**: The middleware in `errorMiddleware.ts` ensures all errors are caught and processed consistently, logging them and sending appropriate HTTP status codes.
- **Custom Errors**: Custom error classes (`ApiError`, `BadRequestError`, `UnauthorizedError`, etc.) are used throughout the application for cleaner error handling.

---

This documentation provides a complete overview of the ThriveConnectApp setup and should be sufficient for getting started with development, debugging, or onboarding new contributors.

## Dockerize

1. To build a Docker image:

```
docker build -t thriveconnect-server .
```

2. After building a Docker image, you can use the following command to run the Docker container

```
docker run -p 3003:3003 --name thriveconnect-container thriveconnect-server
```

3. Tag docker image:

```
docker tag thriveconnect-server:latest tripplen63/thriveconnect-server:latest
```

4. Push the docker image to docker hub:

```
docker push tripplen63/thriveconnect-server:latest
```
