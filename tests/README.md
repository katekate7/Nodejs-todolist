# Todo App Backend Tests

This directory contains tests for the Todo application backend API. These tests are meant to be simple and easy to understand.

## Test Structure

- `setup.js` - Sets up the test environment and mocks
- `server.test.js` - Tests for the server and basic routes
- `auth.test.js` - Tests for authentication endpoints
- `task.test.js` - Tests for task management endpoints

## Running Tests

```bash
npm test
```

## Test Coverage

These tests cover the basic functionality of the API:

### Server Tests
- Verify the server is running and responding

### Authentication Tests
- User registration
- User login with token generation
- Getting user data with a valid token
- Handling protected routes with no token

### Task Management Tests
- Creating tasks
- Getting task list
- Marking tasks as done/undone
- Deactivating (deleting) tasks

## Notes

These tests use mocked responses rather than hitting a real database, making them fast and reliable for quick verification of API logic.
