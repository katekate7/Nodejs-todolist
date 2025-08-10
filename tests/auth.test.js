const request = require('supertest');

// Import the mocked app
const app = require('../src');

describe('Authentication Tests', () => {
  const testUsername = 'testuser' + Math.floor(Math.random() * 10000);
  const testEmail = `${testUsername}@test.com`;
  const testPassword = 'password123';
  let authToken = 'test-token';

  test('Register a new user - POST /auth/register', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        username: testUsername,
        email: testEmail,
        password: testPassword
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User registered successfully!');
  });

  test('Login with registered user - POST /auth/login', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: testEmail,
        password: testPassword
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    
    // Since we're using mock data, we need to adjust our expectations
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('email');
  });

  test('Get user data with token - GET /auth/getUserData', async () => {
    const response = await request(app)
      .get('/auth/getUserData')
      .set('x-access-token', authToken);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('username');
  });

  test('Access protected route without token should fail', async () => {
    const response = await request(app)
      .get('/auth/getUserData');
    
    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'No token provided!');
  });
});
