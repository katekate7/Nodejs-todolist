const fetch = require('node-fetch');

async function testAPI() {
  try {
    // Test 1: Register a user
    console.log('Testing registration endpoint...');
    const registerResponse = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      })
    });
    const registerData = await registerResponse.json();
    console.log('Registration response:', registerData);

    // Test 2: Login with the registered user
    console.log('\nTesting login endpoint...');
    const loginResponse = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'password123'
      })
    });
    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);
    
    if (!loginData.accessToken) {
      console.error('No access token received. Cannot continue with authenticated requests.');
      return;
    }
    
    const token = loginData.accessToken;

    // Test 3: Get user data
    console.log('\nTesting getUserData endpoint...');
    const userDataResponse = await fetch('http://localhost:3000/auth/getUserData', {
      headers: { 'x-access-token': token }
    });
    const userData = await userDataResponse.json();
    console.log('User data response:', userData);

    // Test 4: Create a task
    console.log('\nTesting createTask endpoint...');
    const createTaskResponse = await fetch('http://localhost:3000/task/createTask', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-access-token': token 
      },
      body: JSON.stringify({
        title: 'Test Task'
      })
    });
    const createTaskData = await createTaskResponse.json();
    console.log('Create task response:', createTaskData);

    // Test 5: Get tasks
    console.log('\nTesting getTasks endpoint...');
    const getTasksResponse = await fetch('http://localhost:3000/task/getTasks', {
      headers: { 'x-access-token': token }
    });
    const tasksData = await getTasksResponse.json();
    console.log('Get tasks response:', tasksData);
    
    // Test 6: Mark a task as done if tasks exist
    if (tasksData && tasksData.length > 0) {
      const taskId = tasksData[0].id || tasksData[0]._id;
      console.log('\nTesting markDone endpoint...');
      const markDoneResponse = await fetch('http://localhost:3000/task/markDone', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-access-token': token 
        },
        body: JSON.stringify({ taskId })
      });
      const markDoneData = await markDoneResponse.json();
      console.log('Mark done response:', markDoneData);
    }

    console.log('\nAPI testing completed successfully!');
  } catch (error) {
    console.error('Error during API testing:', error);
  }
}

testAPI();
