<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">Patients</h2>
      <div class="flex space-x-4">
        <input v-model="searchQuery" type="text" placeholder="Search patient..." class="input-field px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <button @click="toggleNewPatientForm" class="bg-indigo-500 text-white px-4 py-2 rounded-md">Add New Patient</button>
      </div>
    </div>

    <div v-if="showNewPatientForm" class="mb-6">
      <h2 class="text-lg font-semibold mb-4">Add New Patient</h2>
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
            <input id="first_name" v-model="newPatient.firstName" type="text" required class="input-field mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
          </div>
          <div>
            <label for="middle_name" class="block text-sm font-medium text-gray-700">Middle Name</label>
            <input id="middle_name" v-model="newPatient.middleName" type="text" class="input-field mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
          </div>
          <div>
            <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input id="last_name" v-model="newPatient.lastName" type="text" required class="input-field mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
          </div>
          <div>
            <label for="dob" class="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input id="dob" v-model="newPatient.dateOfBirth" type="date" required class="input-field mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
          </div>
          <div>
            <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
            <select id="gender" v-model="newPatient.gender" class="input-field mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input id="phone" v-model="newPatient.phoneNumber" type="text" required class="input-field mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
          </div>
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Wereda</label>
            <input id="address" v-model="newPatient.address" type="text" required class="input-field mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
          </div>
       
          <div>
            <label for="kebele" class="block text-sm font-medium text-gray-700">Kebele</label>
            <input id="kebele" v-model="newPatient.kebele" type="text" class="input-field mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded-md">Save</button>
          <button type="button" @click="toggleNewPatientForm" class="ml-4 text-gray-600">Cancel</button>
        </div>
      </form>
    </div>

    <!-- Patient List -->
    <div v-else>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><b>Card No</b></th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><b>Full Name</b></th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><b>Gender</b></th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="patient in patientt" :key="patient.id" @click="selectPatient(patient)" class="hover:bg-gray-50 cursor-pointer">
            <td scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">{{ patient.card_no }}</td>
              <td scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ patient.first_name }} {{ patient.middle_name }} {{ patient.last_name }}</td>
              <td scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ patient.gender }}</td>
            <td scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ patient.phone_number}}</td>
            <td scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button @click.stop="editPatient(patient)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button @click.stop="deletePatient(patient)" class="ml-4 text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Patient Detail Card -->
      <div v-if="selectedPatient" class="mt-6 p-4 bg-white shadow rounded-lg">
        <h3 class="text-lg font-semibold mb-2">{{ selectedPatient.fullName }}</h3>
        <p><strong>Card Number:</strong> {{ selectedPatient.card_no }}</p>
              <p><strong>First Name:</strong> {{ selectedPatient.first_name }}</p>
              <p><strong>Middle Name:</strong> {{ selectedPatient.middle_name }}</p>
              <p><strong>Last Name:</strong> {{ selectedPatient.last_name }}</p>
              <p><strong>Date of Birth:</strong> {{ selectedPatient.date_of_birth }}</p>
              <p><strong>Gender:</strong> {{ selectedPatient.gender }}</p>
              <p><strong>Contact Info:</strong> {{ selectedPatient.phone_number }}</p>
             <div class="mt-4">
          <button @click="editPatient(selectedPatient)" class="bg-indigo-500 text-white px-4 py-2 rounded-md">Edit</button>
          <button @click="deletePatient(selectedPatient)" class="ml-4 bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      patientt: [],
      searchQuery: '',
      showNewPatientForm:true,
      newPatient: {
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        gender: 'male', // Default gender
        phoneNumber: '',
        address: '',
        city: '',
        kebele: '',
      },
      selectedPatient: null,
    };
  },
  computed: {
    // Replace patients with getter from Vuex store
    filteredPatients() {
      return this.$store.getters.patients.filter(patient =>
        patient.fullName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    toggleNewPatientForm() {
      this.showNewPatientForm = !this.showNewPatientForm;
      if (!this.showNewPatientForm) {
        this.resetForm();
      }
    },
    resetForm() {
      this.newPatient = {
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        gender: 'male', // Reset to default gender
        phoneNumber: '',
        address: '',
        city: '',
        kebele: '',
      };
    },
    async fetchPatients() {
      try {
        const response = await axios.post('http://localhost:5000/api/patients');
        this.patientt = response.data;
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    },
    async submitForm() {
      // Dispatch action to submit form data to Vuex store
      await this.$store.dispatch('submitForm', this.newPatient);
      this.toggleNewPatientForm();
    },
    selectPatient(patient) {
      this.selectedPatient = patient;
    },
    editPatient(patient) {
      // Implement edit functionality using Vuex store actions/mutations
      // Example: await this.$store.dispatch('editPatient', patient);
    },
    deletePatient(patient) {
      // Implement delete functionality using Vuex store actions/mutations
      // Example: await this.$store.dispatch('deletePatient', patient);
    },
  },
  mounted() {
    this.fetchPatients();
  },
};
</script>


<style scoped>
.input-field {
  padding: 10px;
  font-size: 16px;
}
table th{
  border: 1px;
}
</style>