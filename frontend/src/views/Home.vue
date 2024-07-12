<!-- src/views/Home.vue -->
<template>
  <div class="home-container flex items-center justify-center min--screen">
    <div class="home-content w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg border border-purple-300">
      <div class="text-center">
        <img src="../assets/eye2.jpg" alt="Logo" class="h-20 mb-4 mx-auto">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Eye Care System</h1>
        <p class="text-lg text-gray-700 mb-6">Your trusted platform for managing eye care services efficiently.</p>
        <router-link to="/login" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out">
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.home-container {
  background-color: ; /* Light background color for the home page */
}

.home-content {
  max-width: 75%; /* Adjust to cover a good portion of the window */
  margin: 0 auto;
}
</style>
