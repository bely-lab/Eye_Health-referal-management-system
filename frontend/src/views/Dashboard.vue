<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard-container flex items-center justify-center min-h-screen bg-gray-100">
    <div class="dashboard-content w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
      <p class="text-lg text-gray-700 mb-6">Welcome, {{ user.username }}!</p>
      <div v-if="user.role === 'receptionist'">
        <p>Receptionist Dashboard Content</p>
        <!-- Add receptionist-specific functionality here -->
      </div>
      <div v-else-if="user.role === 'doctor'">
        <p>Doctor Dashboard Content</p>
        <!-- Add doctor-specific functionality here -->
      </div>
      <div v-else-if="user.role === 'admin'">
        <p>Admin Dashboard Content</p>
        <!-- Add admin-specific functionality here -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['getUser']),
    user() {
      return this.getUser;
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  background-color: #f0f8ff; /* Light background color for the dashboard */
  height: 100vh;
}

.dashboard-content {
  max-width: 75%; /* Adjust to cover a good portion of the window */
  margin: 0 auto;
}
</style>
