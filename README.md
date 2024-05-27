# Task Management Application

## Frontend

This is the frontend part of the Task Management Application. It is built using React and allows users to create, update, delete, and filter tasks.

### Features

-   Create a new task
-   Update an existing task
-   Delete a task
-   Filter tasks by status, priority, assignee, and date
-   Drag and drop tasks between columns

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ShubhanginiSharma627/KanbanBoard.git
    ```

2. Navigate to the frontend directory:

    ```bash
    cd TaskBoard
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

### Usage

-   Access the application at `http://localhost:3000` in your web browser.
-   Use the task form to create new tasks.
-   Drag and drop tasks between columns to update their status.
-   Use the filter options to filter tasks by various criteria.

### Configuration

-   Update the API endpoint in the frontend code to point to the hosted backend URL.

## Backend

This is the backend part of the Task Management Application. It is built using Node.js, Express, and MongoDB. It provides the RESTful API endpoints for managing tasks and users.

### Features

-   User registration and authentication
-   Create, read, update, and delete tasks
-   JWT-based authentication and authorization
-   Input validation and error handling

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ShubhanginiSharma627/KanbanBoard.git
    ```

2. Navigate to the backend directory:

    ```bash
    cd task-manager
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file with the following variables:

    ```
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

5. Start the server:
    ```bash
    npm start
    ```

### Usage

-   The backend server will run at `http://localhost:8000`.
-   The API endpoints will be available at `http://localhost:8000/api`.

### API Endpoints

-   `POST /api/users/register` - Register a new user
-   `POST /api/users/login` - Login a user and get a JWT token
-   `GET /api/tasks` - Get all tasks (requires JWT)
-   `POST /api/tasks` - Create a new task (requires JWT)
-   `PUT /api/tasks/:id` - Update a task by ID (requires JWT)
-   `DELETE /api/tasks/:id` - Delete a task by ID (requires JWT)

### Hosted Backend URL

The backend is hosted at: `https://kanbanboard-oo1f.onrender.com`
