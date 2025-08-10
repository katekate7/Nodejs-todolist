const request = require('supertest');

// Import the mocked app
const app = require('../src');

describe('Task Tests', () => {
  const testUsername = 'taskuser' + Math.floor(Math.random() * 10000);
  const testEmail = `${testUsername}@test.com`;
  const testPassword = 'password123';
  let authToken;
  let taskId;

  // Set a mock token
  beforeAll(() => {
    authToken = 'test-token';
  });

  test('Create a task - POST /task/createTask', async () => {
    const response = await request(app)
      .post('/task/createTask')
      .set('x-access-token', authToken)
      .send({
        title: 'Test Task'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toHaveProperty('title', 'Test Task');
    
    // Store task id for later tests
    taskId = response.body.data[0]._id;
  });

  test('Get tasks - GET /task/getTasks', async () => {
    const response = await request(app)
      .get('/task/getTasks')
      .set('x-access-token', authToken);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toHaveProperty('title', 'Test Task');
  });

  test('Mark task as done - POST /task/markDone', async () => {
    const response = await request(app)
      .post('/task/markDone')
      .set('x-access-token', authToken)
      .send({
        _id: taskId
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    
    // Verify the task is marked as done
    const task = response.body.data.find(t => t._id === taskId);
    expect(task).toHaveProperty('completed', true);
  });

  test('Mark task as undone - POST /task/markUnDone', async () => {
    const response = await request(app)
      .post('/task/markUnDone')
      .set('x-access-token', authToken)
      .send({
        _id: taskId
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    
    // Verify the task is marked as not done
    const task = response.body.data.find(t => t._id === taskId);
    expect(task).toHaveProperty('completed', false);
  });

  test('Deactivate task - POST /task/deActivateTask', async () => {
    const response = await request(app)
      .post('/task/deActivateTask')
      .set('x-access-token', authToken)
      .send({
        _id: taskId
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    
    // The task should no longer be in the active tasks list
    const taskExists = response.body.data.some(t => t._id === taskId);
    expect(taskExists).toBe(false);
  });
});
