<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Organization Admin Dashboard</h1>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label class="block text-gray-700">User Name</label>
          <input v-model="username" class="border p-2 w-full" type="text" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input v-model="password" class="border p-2 w-full" type="password" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Full Name</label>
          <input v-model="name" class="border p-2 w-full" type="text" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Role</label>
          <select v-model="role" class="border p-2 w-full">
            <option>Doctor</option>
            <option>Nurse</option>
            <option>Receptionist</option>
          </select>
        </div>
        <button class="bg-blue-500 text-white p-2" type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'OrgAdminDashboard',
    data() {
      return {
        username: '',
        password: '',
        name: '',
        role: '',
      };
    },
    methods: {
      async registerUser() {
        await axios.post('http://localhost:8080/v1/graphql', {
          query: `
            mutation {
              insert_users_one(object: {
                organization_id: ${this.$store.getters.user.organization_id},
                username: "${this.username}",
                password: "${this.password}",
                name: "${this.name}",
                role: "${this.role}"
              }) {
                id
              }
            }
          `,
        });
        alert('User registered!');
      },
    },
  };
  </script>
  