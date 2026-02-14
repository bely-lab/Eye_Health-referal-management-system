<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Add New Patient</h2>
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="card_no" class="block text-sm font-medium text-gray-700">Card No</label>
            <input v-model="card_no" type="text" id="card_no" class="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
          </div>
          <div>
            <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
            <input v-model="first_name" type="text" id="first_name" class="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
          </div>
          <div>
            <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input v-model="last_name" type="text" id="last_name" class="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
          </div>
          <div>
            <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
            <select v-model="gender" id="gender" class="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label for="phone_number" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input v-model="phone_number" type="text" id="phone_number" class="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
          </div>
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <input v-model="address" type="text" id="address" class="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
          </div>
          <div>
            <label for="birth_date" class="block text-sm font-medium text-gray-700">Birth Date</label>
            <input v-model="birth_date" type="date" id="birth_date" class="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500">Add Patient</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddPatientForm',
    data() {
      return {
        card_no: '',
        first_name: '',
        last_name: '',
        gender: '',
        phone_number: '',
        address: '',
        birth_date: '',
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await fetch('/api/patients', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              card_no: this.card_no,
              first_name: this.first_name,
              last_name: this.last_name,
              gender: this.gender,
              phone_number: this.phone_number,
              address: this.address,
              birth_date: this.birth_date,
            }),
          });
          if (response.ok) {
            alert('Patient added successfully!');
            this.$router.push({ name: 'ReceptionistDashboard' });
          } else {
            throw new Error('Failed to add patient.');
          }
        } catch (error) {
          console.error('Error adding patient:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input, select {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    margin-top: 0.5rem;
  }
  
  button {
    background-color: #5a67d8;
    color: white;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #434190;
  }
  </style>
  