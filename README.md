# Node Task Manager

A simple Node.js task management API using Express and TypeORM.

## Features
- RESTful API for managing tasks
- PostgreSQL and SQLite support (SQLite for testing)
- Environment variable configuration with dotenv
- Modular structure with controllers and entities

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- PostgreSQL (for production)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/MarthinKorb/node-task-manager
   cd node-task-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   DATABASE=default
   USER=default
   PASSWORD=default
   SCHEMA=tasks_manager
   NODE_ENV=development
   ```

### Running the Server
```sh
npm start
```

### API Endpoints
- `GET /tasks` - List all tasks
- `GET /tasks/:id` - Get a task by ID
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Project Structure
```
src/
  controllers/
    TaskController.ts
  entities/
    Task.ts
  data-source.ts
  server.ts
```

## License
MIT
