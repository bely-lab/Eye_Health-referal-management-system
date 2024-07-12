<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="first_name">First Name:</label>
      <input v-model="patientData.first_name" type="text" id="first_name" required>
    </div>
    <div>
      <label for="last_name">Last Name:</label>
      <input v-model="patientData.last_name" type="text" id="last_name" required>
    </div>
    <div>
      <label for="gender">Gender:</label>
      <select v-model="patientData.gender" id="gender" required>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div>
      <label for="phone_number">Phone Number:</label>
      <input v-model="patientData.phone_number" type="text" id="phone_number" required>
    </div>
    <button type="submit">Add Patient</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      patientData: {
        first_name: '',
        last_name: '',
        gender: 'male',
        phone_number: '',
      },
    };
  },
  methods: {
    ...mapActions(['addPatient']),
    async submitForm() {
      try {
        await this.addPatient(this.patientData);
        // Clear the form after successful submission if needed
        this.patientData = {
          first_name: '',
          last_name: '',
          gender: 'male',
          phone_number: '',
        };
      } catch (error) {
        console.error('Error adding patient:', error);
        // Handle error as needed (e.g., show error message)
      }
    },
  },
};
</script>
