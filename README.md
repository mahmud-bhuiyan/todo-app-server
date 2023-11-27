#Task Manager Api

This is a Task Management API implemented using Node.js, Express.js, and MongoDB.

## Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed locally or accessible remotely

# Installation And Usage

Follow these steps to set up and run the project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mahmud-bhuiyan/SJI-task-manager-API.git
   ```

2. **Install dependencies:**

   ```bash
   cd SJI-task-manager-API.git
   npm install
   ```

3. **Create a .env file:**

   Create a `.env` file in the root of your project and add the following information:

   ```
   MONGO_URL=your_mongo_connection_url
   JWT_SECRET_KEY=your_SECRET_KEY
   DB_NAME=your_DB_name
   PORT=3001
   ```

   Replace `your_mongo_connection_url` with your actual MongoDB connection URI and choose a suitable `PORT`.

4. **Start the server:**

   ```bash
   npm start
   or
   nodemon start
   ```

   Access the application in a web browser at `http://localhost:3001`.

# Task API Documentation

    API for managing tasks.

### Task Model

- **title**: Title of the task
- **description**: Description of the task
- **status**: Current status of the task
- **dueDate**: Due date of the task

# Endpoints

### Create a new task

```http
POST /api/v1/tasks
```

#### Demo Request

```json
{
  "title": "Task 7",
  "description": "Description for Task 7 goes here.",
  "status": "completed",
  "dueDate": "2023-12-15T15:00:37.091Z"
}
```

### Fetch all tasks from the database

```http
GET /api/v1/tasks
```

#### Demo Response

```json
{
  "tasks": [
    {
      "_id": "65620805bc6fc1b9256aebe9",
      "title": "Task 1 updated",
      "description": "Description for Task 1 updated.",
      "status": "completed",
      "dueDate": "2023-12-10T00:00:00.000Z",
      "createdAt": "2023-11-25T14:43:17.876Z",
      "updatedAt": "2023-11-25T15:10:05.187Z",
      "__v": 0
    },
    {
      "_id": "65620805bc6fc1b9256aebea",
      "title": "Task 2",
      "description": "Description for Task 2 goes here.",
      "status": "in-progress",
      "dueDate": null,
      "createdAt": "2023-11-25T14:43:17.876Z",
      "updatedAt": "2023-11-25T14:43:17.876Z",
      "__v": 0
    }
  ]
}
```

### Fetch a single task by its id

```http
GET /api/v1/tasks/:id
```

#### Demo Response

```json
{
  "task": {
    "_id": "65620805bc6fc1b9256aebe9",
    "title": "Task 1 updated",
    "description": "Description for Task 1 updated.",
    "status": "completed",
    "dueDate": "2023-12-10T00:00:00.000Z",
    "createdAt": "2023-11-25T14:43:17.876Z",
    "updatedAt": "2023-11-25T15:10:05.187Z",
    "__v": 0
  }
}
```

### Update a task by its id

```http
PUT /api/v1/tasks/:id
```

#### Demo Request

```json
{
  "title": "Task 1 updated",
  "description": "Description for Task 1 updated.",
  "status": "completed",
  "dueDate": "2023-12-10"
}
```

### Delete a task by its id

```http
DELETE /api/v1/tasks/:id
```

#### Demo Response

```json
{
  "message": "Task 6 has been deleted",
  "deleteCount": 1
}
```

## Error Handling

The API handles errors including:

- User already exists
- User not found
- User invalid credentials
- Invalid token
- Invalid signature
- Task not found
- Invalid task data
- Other potential errors

# Folder Structure

```plaintext
project-root/
│
├── controllers/
│ ├── taskController.js
│ ├── userController.js
│
├── db/
│ ├── connect.js
│
├── errors/
│ ├── customError.js
│
├── middleware/
│ ├── asyncWrapper.js
│ ├── auth.js
│ ├── customErrorHandler.js
│ ├── notFound.js
│
├── models/
│ ├── Task.js
│ ├── User.js
│
├── public/
│ ├── favicon.ico
│ ├── index.html
│ ├── main.css
│
├── routes/
│ ├── taskRoutes.js
│ ├── userRoutes.js
│
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

# The END

Many Thanks to `SJ Innovation` and `Project MearnifyU Team` For Your Support!
