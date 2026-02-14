<template>
    <div class="referral-response-page">
      <h1 class="title">Referral Response</h1>
      <div class="checklist-container">
        <table class="checklist-table">
          <thead>
            <tr>
              <th colspan="2">Anterior Segment</th>
              <th colspan="2">Posterior Segment</th>
            </tr>
            <tr>
              <th>Right Eye</th>
              <th>Left Eye</th>
              <th>Right Eye</th>
              <th>Left Eye</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in anteriorSegmentRight" :key="item.id">
              <td>
                <label>
                  <input type="checkbox" v-model="item.checked"> &nbsp;
                  {{ item.label }}
                </label>
              </td>
              <td>
                <label v-if="anteriorSegmentLeft[index]">
                  <input type="checkbox" v-model="anteriorSegmentLeft[index].checked"> &nbsp;
                   {{ anteriorSegmentLeft[index].label }}
                </label>
              </td>
              <td>
                <label v-if="posteriorSegmentRight[index]">
                  <input type="checkbox" v-model="posteriorSegmentRight[index].checked">&nbsp;
                  {{ posteriorSegmentRight[index].label }}
                </label>
              </td>
              <td>
                <label v-if="posteriorSegmentLeft[index]">
                  <input type="checkbox" v-model="posteriorSegmentLeft[index].checked">&nbsp;
                  {{ posteriorSegmentLeft[index].label }}
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="treatment-plan">
        <h2>Treatment Plan</h2>
        <label>
          <input type="checkbox" v-model="treatmentPlan.returnToProvider">&nbsp;
          (Treatment plan) and patient to return to provider at (follow-up interval)
        </label>
        <label>
          <input type="checkbox" v-model="treatmentPlan.reEvaluate">&nbsp;
          Re-evaluate the patient in (follow-up interval)
        </label>
        <label>
          <input type="checkbox" v-model="treatmentPlan.referToPhysician">&nbsp;
          Refer the patient to (REFERRED PHYSICIAN Office/Group) for assessment and possible treatment.
        </label>
      </div>
      <div class="examining-optometrist">
        <h2>Examining Optometrist</h2>
        <label>Name:
          <input type="text" v-model="optometrist.name" placeholder="Dr. Mulugeta">
        </label>
      </div>
      <button class="submit-button" @click="submitResponse">Submit</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReferralResponse',
    data() {
      const createSegmentData = (labels) => {
        return labels.map((label, index) => ({ id: index + 1, label, checked: false }));
      };
  
      const labels = [
        'Episcleritis', 'Diabetic Retinopathy', 'Conjunctivitis', 'Glaucoma', 'Dry Eye', 'HTN Retinopathy', 'Injury', 'Macular Degeneration', 'Ulcer', 'Retinal Hole', 'Hordeolum', 'Hemorrhage', 'Trichiasis', 'Blepharitis', 'Cataract', 'Other', 'Unremarkable'
      ];
  
      return {
        anteriorSegmentRight: createSegmentData(labels),
        anteriorSegmentLeft: createSegmentData(labels),
        posteriorSegmentRight: createSegmentData(labels.slice(1)), // Example for different labels
        posteriorSegmentLeft: createSegmentData(labels.slice(1)),  // Example for different labels
        treatmentPlan: {
          returnToProvider: false,
          reEvaluate: false,
          referToPhysician: false
        },
        optometrist: {
          name: ''
        }
      };
    },
    methods: {
      submitResponse() {
        // Handle the submission logic here
        console.log('Anterior Segment Right:', this.anteriorSegmentRight);
        console.log('Anterior Segment Left:', this.anteriorSegmentLeft);
        console.log('Posterior Segment Right:', this.posteriorSegmentRight);
        console.log('Posterior Segment Left:', this.posteriorSegmentLeft);
        console.log('Treatment Plan:', this.treatmentPlan);
        console.log('Optometrist:', this.optometrist);
      }
    }
  }
  </script>
  
  <style scoped>
  .referral-response-page {
    padding: 20px;
  }
  
  .title {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .checklist-container {
    display: flex;
    justify-content: center;
  }
  
  .checklist-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .checklist-table th, .checklist-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  .checklist-table th {
    background-color: #f2f2f2;
    font-size: 1rem;
  }
  
  .eye-column label {
    display: flex;
    align-items: center;
  }
  
  .treatment-plan, .examining-optometrist {
    margin-top: 20px;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  input[type="text"] {
    margin-left: 10px;
  }
  
  .submit-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  </style>
  