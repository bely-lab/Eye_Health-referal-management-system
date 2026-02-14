// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || null,
    userName: localStorage.getItem('userName') || 'User',
    userRole: localStorage.getItem('userRole') || null,
    patients: [], // Array to hold patient data
  },
  mutations: {
    setToken(state, { token, role, userName }) {
      state.token = token;
      state.userRole = role;
      state.userName = userName;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', userName);
    },
    clearToken(state) {
      state.token = null;
      state.userRole = null;
      state.userName = 'User';
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
    },
    ADD_PATIENT(state, patient) {
      state.patients.push(patient); // Mutate state to add a new patient
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const { token, role, userName } = await response.json();
        commit('setToken', { token, role, userName }); // Save token, role, and userName to Vuex state
        return true;
      } catch (error) {
        console.error('Error logging in:', error);
        return false;
      }
    },

    // async login({ commit }, credentials) {
    //   const response = await axios.post('http://localhost:8080/v1/auth/login', credentials);
    //   commit('setUser', response.data.user);
    //   commit('setToken', response.data.token);
    // },
    // async fetchUser({ commit }) {
    //   const response = await axios.get('http://localhost:8080/v1/auth/user', {
    //     headers: { Authorization: `Bearer ${this.state.token}` },
    //   });
    //   commit('setUser', response.data);
    // },
  
  

    
    async submitForm({ commit }, newPatient) {
      try {
        const response = await fetch('http://localhost:5000/api/insert-patient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
          },
          body: JSON.stringify(newPatient),
        });

        if (!response.ok) {
          throw new Error('Failed to add patient');
        }

        const data = await response.json();
        console.log('Inserted patient:', data);
        commit('ADD_PATIENT', data.data.insert_patients_one); // Commit mutation to add patient to state
      } catch (error) {
        console.error('Error inserting patient at store:', error);
        // Handle error accordingly
      }
    },
    async fetchPatients({ commit }) {
      try {
        const response = await fetch('http://localhost:5000/api/get-patients', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }

        const data = await response.json();
        commit('SET_PATIENTS', data); // Commit mutation to set fetched patients into state
      } catch (error) {
        console.error('Error fetching patients:', error);
        // Handle error accordingly
      }
    },
    async fetchPatientDetails({ commit }, patientId) {
      try {
        const response = await fetch(`http://localhost:5000/api/get-patient/${patientId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patient details');
        }

        const data = await response.json();
        commit('SET_PATIENT_DETAILS', data); // Commit mutation to set patient details
      } catch (error) {
        console.error('Error fetching patient details:', error);
        // Handle error accordingly
      }
    },
    logout({ commit }) {
      commit('clearToken');
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    userName: (state) => state.userName,
    userRole: (state) => state.userRole,
    patients: (state) => state.patients,
  },
});

export default store;
