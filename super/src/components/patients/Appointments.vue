<template>
  <div>
    <h2 class="text-xl font-bold mb-6">Appointments</h2>

    <!-- Appointment List -->
    <div v-if="!showNewAppointmentForm">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">Upcoming Appointments</h3>
        <button @click="toggleNewAppointmentForm" class="bg-indigo-500 text-white px-4 py-2 rounded-md">Schedule New</button>
      </div>

      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ appointment.patientName }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ appointment.dateTime }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ appointment.doctor }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="editAppointment(appointment)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button @click="deleteAppointment(appointment)" class="ml-4 text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- New Appointment Form -->
    <div v-if="showNewAppointmentForm" class="mt-6">
      <h3 class="text-lg font-semibold mb-4">Schedule New Appointment</h3>
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="patient_name" class="block text-sm font-medium text-gray-700">Patient Name</label>
            <input id="patient_name" v-model="newAppointment.patientName" type="text" required class="input-field mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
          </div>
          <div>
            <label for="date_time" class="block text-sm font-medium text-gray-700">Date & Time</label>
            <input id="date_time" v-model="newAppointment.dateTime" type="datetime-local" required class="input-field mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
          </div>
          <div>
            <label for="doctor" class="block text-sm font-medium text-gray-700">Doctor</label>
            <input id="doctor" v-model="newAppointment.doctor" type="text" required class="input-field mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md">
          </div>
          <div>
            <label for="appointment_type" class="block text-sm font-medium text-gray-700">Appointment Type</label>
            <select id="appointment_type" v-model="newAppointment.appointmentType" class="input-field mt-1 block w-full py-2 px-3 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="routine">Routine Check-up</option>
              <option value="emergency">Emergency Visit</option>
              <option value="follow_up">Follow-up Consultation</option>
            </select>
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded-md">Schedule</button>
          <button type="button" @click="toggleNewAppointmentForm" class="ml-4 text-gray-600">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNewAppointmentForm: true,
      appointments: [], // This will hold the list of appointments
      newAppointment: {
        patientName: '',
        dateTime: '',
        doctor: '',
        appointmentType: 'routine', // Default appointment type
      },
    };
  },
  methods: {
    toggleNewAppointmentForm() {
      this.showNewAppointmentForm = !this.showNewAppointmentForm;
      if (!this.showNewAppointmentForm) {
        this.resetForm();
      }
    },
    resetForm() {
      this.newAppointment = {
        patientName: '',
        dateTime: '',
        doctor: '',
        appointmentType: 'routine', // Reset to default appointment type
      };
    },
    submitForm() {
      const newAppointment = {
        ...this.newAppointment,
        id: Date.now().toString(),
      };
      this.appointments.push(newAppointment);
      this.toggleNewAppointmentForm();
    },
    editAppointment(appointment) {
      // Implement edit functionality here
    },
    deleteAppointment(appointment) {
      this.appointments = this.appointments.filter(a => a.id !== appointment.id);
    },
  },
};
</script>

<style scoped>
.input-field {
  padding: 10px;
  font-size: 16px;
}
</style>
