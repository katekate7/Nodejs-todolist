# Node.js Express Todo Application

[![Node.js CI](https://github.com/katekate7/Nodejs-todolist/actions/workflows/node-ci.yml/badge.svg)](https://github.com/katekate7/Nodejs-todolist/actions/workflows/node-ci.yml)
[![Docker Build](https://github.com/katekate7/Nodejs-todolist/actions/workflows/docker-build.yml/badge.svg)](https://github.com/katekate7/Nodejs-todolist/actions/workflows/docker-build.yml)
[![Security Scan](https://github.com/katekate7/Nodejs-todolist/actions/workflows/security-scan.yml/badge.svg)](https://github.com/katekate7/Nodejs-todolist/actions/workflows/security-scan.yml)
[![CodeQL](https://github.com/katekate7/Nodejs-todolist/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/katekate7/Nodejs-todolist/actions/workflows/codeql-analysis.yml)

This is a simple To-Do application built with Node.js and Express. The API allows users to perform CRUD operations on a list of tasks, and requires JWT authentication to access. The data is stored in a MongoDB database.

## Requirements

- Node.js
- MongoDB

## Installation

1 Clone the repository:

```

git clone https://github.com/katekate7/Nodejs-todolist.git

```

2 Install the dependencies:

```

yarn
```

3 Configure environment variables:

Create a .env file in the root directory of the project and add the following variables:

```
APP_PORT=your-app-port
MONGO_URL=your-mongodb-uri
SECRET_TOKEN=your-jwt-secret

```

4 Start the server:

```
    npm start
```

## API Endpoints

```
 GET /api/task/getTasks: Get all tasks
 POST /api/task/markDone:id: Mark task completed
 POST /api/task/markUnDone:id: Mark task not completed
 POST /api/task/activateTask:id: Delete task
 POST /api/task/deActivateTask:id: Bring back deleted task
 POST /api/task/createTask:title: Create new task
 POST /api/auth/register: Sign up a new user
 POST /api/auth/login: Sign in an existing user
```

## Authentication

To access the API endpoints that require authentication, you need to provide a JSON Web Token (JWT) in the request header as follows:

```
Authorization: Bearer your-jwt-token
```

## DevOps & CI/CD

This project is fully equipped with CI/CD pipelines using GitHub Actions:

- **Continuous Integration**: Automated tests run on each push and pull request
- **Security Scanning**: Regular security scans to identify vulnerabilities
- **Docker Integration**: Automated Docker image building and publishing
- **Dependency Checks**: Regular checks for outdated dependencies
- **Static Code Analysis**: CodeQL analysis for code quality and security issues
- **Automated Deployment**: Deployment pipeline for production environments

See the `.github/workflows` directory for detailed workflow configurations.

## Deployment

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## License

This project is licensed under the MIT License. See the LICENSE file for details.
