// This file is used to setup test environment
process.env.NODE_ENV = 'test';

// Set environment variables for testing
process.env.APP_PORT = 3001; // Different port for testing
process.env.MONGO_URL = 'mongodb://127.0.0.1:27017/todo-app-test';
process.env.SECRET_TOKEN = 'test-secret-token';

// Prevent the app from automatically starting in test mode
jest.mock('../src', () => {
  const express = require('express');
  const app = express();
  
  // Basic route for testing
  app.get('/', (req, res) => {
    res.json({ message: 'Server active.' });
  });

  // Add body-parser middleware
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  
  // Mock auth routes
  app.post('/auth/register', (req, res) => {
    res.status(200).json({ message: 'User registered successfully!' });
  });

  app.post('/auth/login', (req, res) => {
    res.status(200).json({
      id: 'test-id',
      username: req.body.username || 'testuser',
      email: req.body.email || 'test@example.com',
      accessToken: 'test-token'
    });
  });

  app.get('/auth/getUserData', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).json({ message: 'No token provided!' });
    }
    res.json({ username: 'testuser' });
  });

  // Mock task routes
  app.post('/task/createTask', (req, res) => {
    res.status(200).json({
      data: [{
        _id: 'test-task-id',
        title: req.body.title || 'Test Task',
        completed: false,
        active: true
      }]
    });
  });

  app.get('/task/getTasks', (req, res) => {
    res.status(200).json({
      data: [{
        _id: 'test-task-id',
        title: 'Test Task',
        completed: false,
        active: true
      }]
    });
  });

  app.post('/task/markDone', (req, res) => {
    res.status(200).json({
      data: [{
        _id: req.body._id || 'test-task-id',
        title: 'Test Task',
        completed: true,
        active: true
      }]
    });
  });

  app.post('/task/markUnDone', (req, res) => {
    res.status(200).json({
      data: [{
        _id: req.body._id || 'test-task-id',
        title: 'Test Task',
        completed: false,
        active: true
      }]
    });
  });

  app.post('/task/deActivateTask', (req, res) => {
    res.status(200).json({ data: [] });
  });

  return app;
});
