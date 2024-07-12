<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Patient Details</h2>
      <div v-if="patient" class="space-y-4">
        <div class="flex">
          <div class="w-1/2">
            <p class="text-sm font-medium text-gray-500">Card No:</p>
            <p class="text-lg text-gray-900">{{ patient.card_no }}</p>
          </div>
          <div class="w-1/2">
            <p class="text-sm font-medium text-gray-500">Full Name:</p>
            <p class="text-lg text-gray-900">{{ patient.first_name }} {{ patient.last_name }}</p>
          </div>
        </div>
        <div class="flex">
          <div class="w-1/2">
            <p class="text-sm font-medium text-gray-500">Gender:</p>
            <p class="text-lg text-gray-900">{{ patient.gender }}</p>
          </div>
          <div class="w-1/2">
            <p class="text-sm font-medium text-gray-500">Phone Number:</p>
            <p class="text-lg text-gray-900">{{ patient.phone_number }}</p>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Address:</p>
          <p class="text-lg text-gray-900">{{ patient.address }}</p>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500">Birth Date:</p>
          <p class="text-lg text-gray-900">{{ patient.birth_date }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PatientDetails',
    data() {
      return {
        patient: null,
      };
    },
    created() {
      this.fetchPatientDetails();
    },
    methods: {
      async fetchPatientDetails() {
        const card_no = this.$route.params.card_no;
        try {
          const response = await fetch(`/api/patients/${card_no}`);
          const data = await response.json();
          this.patient = data;
        } catch (error) {
          console.error('Error fetching patient details:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
  </style>
  