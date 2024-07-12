<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="handleSubmit">
        <input v-model="username" placeholder="Username" />
        <input type="password" v-model="password" placeholder="Password" />
        <select v-model="role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { register } from '../api';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        role: 'user',
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await register(this.username, this.password, this.role);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  