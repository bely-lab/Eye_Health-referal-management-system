<template>
    <div class="new-user-form">
      <h2 class="text-2xl font-bold mb-4">Register New User</h2>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium">Username</label>
          <input type="text" v-model="newUser.username" required class="input">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">Password</label>
          <input type="password" v-model="newUser.password" required class="input">
        </div>
        <div class="mb-4">
          <label for="role" class="block text-sm font-medium">Role</label>
          <select v-model="newUser.role" required class="input">
            <option value="Receptionist">Receptionist</option>
            <option value="healthcare-worker">Healthcare Worker</option>
            <option value="doctor">Doctor</option>
            <option value="Admin">Admin</option>
            
          </select>
        </div>
        <button type="submit" class="btn">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newUser: {
          username: '',
          password: '',
          role: 'Receptionist',
        },
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.newUser),
          });
          if (!response.ok) {
            throw new Error('Registration failed');
          }
          alert('User registered successfully');
          this.newUser = { username: '', password: '', role: 'Receptionist' };
        } catch (error) {
          alert(error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .input {
    display: block;
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  