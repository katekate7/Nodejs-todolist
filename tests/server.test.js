const request = require('supertest');
const express = require('express');

// Import the mocked app
const app = require('../src');

describe('Server Tests', () => {
  test('Server is running - GET / should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Server active.');
  });
});
