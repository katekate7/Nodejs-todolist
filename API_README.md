# Node.js Todo Backend API

A simple RESTful API for managing todo tasks with user authentication.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   APP_PORT=3000
   MONGO_URL=mongodb://127.0.0.1:27017/todo-app
   SECRET_TOKEN=your-super-secret-jwt-token
   ```

3. Start MongoDB:
   ```
   brew services start mongodb-community@6.0
   ```

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication

#### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "yourUsername",
    "email": "your@email.com",
    "password": "yourPassword"
  }
  ```
- **Response**: Success message

#### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "your@email.com",
    "password": "yourPassword"
  }
  ```
- **Response**: User data and JWT token

#### Get User Data
- **URL**: `/auth/getUserData`
- **Method**: `GET`
- **Headers**: `x-access-token: yourJWTToken`
- **Response**: User data

### Tasks

#### Get Tasks
- **URL**: `/task/getTasks`
- **Method**: `GET`
- **Headers**: `x-access-token: yourJWTToken`
- **Response**: Array of tasks

#### Create Task
- **URL**: `/task/createTask`
- **Method**: `POST`
- **Headers**: `x-access-token: yourJWTToken`
- **Body**:
  ```json
  {
    "title": "Task Title"
  }
  ```
- **Response**: Updated list of tasks

#### Mark Task as Done
- **URL**: `/task/markDone`
- **Method**: `POST`
- **Headers**: `x-access-token: yourJWTToken`
- **Body**:
  ```json
  {
    "_id": "taskId"
  }
  ```
- **Response**: Updated list of tasks

#### Mark Task as Undone
- **URL**: `/task/markUnDone`
- **Method**: `POST`
- **Headers**: `x-access-token: yourJWTToken`
- **Body**:
  ```json
  {
    "_id": "taskId"
  }
  ```
- **Response**: Updated list of tasks

#### Deactivate Task
- **URL**: `/task/deActivateTask`
- **Method**: `POST`
- **Headers**: `x-access-token: yourJWTToken`
- **Body**:
  ```json
  {
    "_id": "taskId"
  }
  ```
- **Response**: Updated list of tasks

#### Activate Task
- **URL**: `/task/activateTask`
- **Method**: `POST`
- **Headers**: `x-access-token: yourJWTToken`
- **Body**:
  ```json
  {
    "_id": "taskId"
  }
  ```
- **Response**: Updated list of tasks

## Testing

You can use the `test-api.js` script to test the API:
```
node test-api.js
```

This will create a test user, log in, create a task, and verify other endpoints are working correctly.
