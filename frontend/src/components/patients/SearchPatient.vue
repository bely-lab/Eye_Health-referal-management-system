<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">New Patient Registration</h2>
      <!-- Form for new patient registration -->
      <form @submit.prevent="submitForm">
        <!-- Form fields -->
        <label for="name" class="block mb-2">Full Name:</label>
        <input type="text" id="name" v-model="patient.name" class="border-gray-300 rounded-md px-3 py-2 w-full mb-2">
  
        <label for="dob" class="block mb-2">Date of Birth:</label>
        <input type="date" id="dob" v-model="patient.dateOfBirth" class="border-gray-300 rounded-md px-3 py-2 w-full mb-2">
  
        <label for="gender" class="block mb-2">Gender:</label>
        <select id="gender" v-model="patient.gender" class="border-gray-300 rounded-md px-3 py-2 w-full mb-2">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
  
        <!-- Submit button -->
        <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded-md">Register Patient</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        patient: {
          name: '',
          dateOfBirth: '',
          gender: 'male',
          // Add more fields as needed
        },
      };
    },
    methods: {
      submitForm() {
        // Logic to handle form submission (e.g., API call to register patient)
        console.log('Form submitted:', this.patient);
        // Example: API call to register patient
        // axios.post('/api/patients/register', this.patient)
        //   .then(response => {
        //     console.log('Patient registered successfully:', response.data);
        //     // Optionally, redirect to patient list or another page
        //   })
        //   .catch(error => {
        //     console.error('Error registering patient:', error);
        //     // Handle error display or retry logic
        //   });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add scoped styles here if needed */
  </style>
  