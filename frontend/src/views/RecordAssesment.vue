<template>
  <div class="initial-assessment-form">
    <h2 class="text-2xl font-bold mb-4">Initial Assessment</h2>
    <form @submit.prevent="submitAssessment">
      <div class="grid grid-cols-2 gap-4">
        <div class="mb-4">
          <label for="vaOD" class="block text-sm font-medium">Card NO</label>
          <input type="text" v-model="assessment.card_no" required class="input">
        </div>
        <div class="mb-4">
          <label for="vaOD" class="block text-sm font-medium">VA OD</label>
          <select v-model="assessment.vaOD" required class="input">
            <option disabled value="">Select VA OD</option>
            <option v-for="value in vaOptions" :key="value" :value="value">{{ value }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="vaOS" class="block text-sm font-medium">VA OS</label>
          <select v-model="assessment.vaOS" required class="input">
            <option disabled value="">Select VA OS</option>
            <option v-for="value in vaOptions" :key="value" :value="value">{{ value }}</option>
          </select>
        </div>
       
        <div class="mb-4">
          <label for="chiefComplaint" class="block text-sm font-medium">Chief Complaint</label>
          <input type="text" v-model="assessment.chiefComplaint" required class="input">
        </div>
        <div class="mb-4">
          <label for="shortHistory" class="block text-sm font-medium">Short History</label>
          <textarea v-model="assessment.shortHistory" required class="input"></textarea>
        </div>
        <div class="mb-4">
          <label for="diagnosis" class="block text-sm font-medium">Diagnosis</label>
          <input type="text" v-model="assessment.diagnosis" required class="input">
        </div>
        <div class="mb-4">
          <label for="treatment" class="block text-sm font-medium">Treatment</label>
          <textarea v-model="assessment.treatment" required class="input"></textarea>
        </div>
      </div>
      <button type="submit" class="btn center -">Submit Assessment</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vaOptions: ['20/20', '20/25', '20/30', '20/40', '20/50', '20/60', '20/70', '20/80', '20/100', '20/200', 'Count Fingers', 'Hand Motion', 'Light Perception', 'No Light Perception'],
  
      assessment: {
        vaOD: '',
        vaOS: '',
        chiefComplaint: '',
        shortHistory: '',
        diagnosis: '',
        treatment: '',
        card_no:''
      }
    };
  },
  methods: {
    async submitAssessment() {
      try {
        const response = await fetch('http://localhost:5000/api/submit-assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.assessment)
        });
        if (!response.ok) {
          throw new Error('Assessment submission failed');
        }
        alert('Assessment submitted successfully');
        this.assessment = {
          vaOD: '',
          vaOS: '',
          chiefComplaint: '',
          shortHistory: '',
          diagnosis: '',
          treatment: ''
        };
      } catch (error) {
        alert(error.message);
      }
    }
  }

};
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  padding: 8px 16px;
  background-color: blue; /* Orange-like color */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover {
  background-color:; /* Darker shade of orange-like color */
}
</style>
