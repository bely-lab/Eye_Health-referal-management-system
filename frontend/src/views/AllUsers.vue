<template>
    <div class="all-users">
      <h2 class="text-2xl font-bold mb-4">All Users</h2>
      <table class="min-w-full bg-white">
        <thead class="bg-gray-200">
          <tr>
            <th class="py-2 px-4 border-b">Username</th>
            <th class="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="py-2 px-4 border-b">{{ user.username }}</td>
            <td class="py-2 px-4 border-b">{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
      };
    },
    async created() {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  .all-users {
    background-color: #f8fafc;
    padding: 16px;
    border-radius: 8px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 12px;
    text-align: left;
  }
  thead {
    background-color: #e2e8f0;
  }
  tbody tr:nth-child(even) {
    background-color: #f1f5f9;
  }
  </style>
  