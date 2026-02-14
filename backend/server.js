require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const authenticateToken = require('./authMiddleware'); // Import the middleware
const cors = require('cors'); // Import cors module

const app = express();
const PORT = process.env.PORT || 5000;


const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
  res.send('Welcome to the Eye Care System API'); // Modify this message as needed
});

app.get('/health', async (req, res) => {
  try {
    // Attempt to query PostgreSQL to verify connection
    const client = await pool.connect();
    const result = await client.query('SELECT $1::text as message', ['Hello, PostgreSQL!']);
    res.status(200).json({ status: 'success', message: result.rows[0].message });
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    res.status(500).json({ status: 'error', error: 'Still No' });
  }
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into database
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id',
      [username, hashedPassword, role]
    );
    res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//register api
app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;

  console.log('Received request:', req.body); // Log the request body

  // Hash password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (hashError) {
    console.error('Error hashing password:', hashError);
    return res.status(500).json({ error: 'Internal server error - password hashing' });
  }

  // Insert user into database
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id',
      [username, hashedPassword, role]
    );
    res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].id });
  } catch (dbError) {
    console.error('Error inserting user into database:', dbError);
    res.status(500).json({ error: 'Internal server error - database', details: dbError.message });
  }
});


// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET);
    res.json({ token, role: user.rows[0].role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const roles = [
  { id: 2, name: 'Reception' },

];

// Endpoint to fetch roles
app.get('/roles', (req, res) => {
  res.json(roles);
});
// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});
app.post('/api/register-patient', async (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, contactInfo } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO patients (first_name, last_name, date_of_birth, gender, contact_info) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [firstName, lastName, dateOfBirth, gender, contactInfo]
    );
    res.status(201).json({ message: 'Patient registered successfully', patientId: result.rows[0].id });
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/patients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patients');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/patients/:id/assessments', async (req, res) => {
  const patientId = req.params.id;
  const { visionAcuity } = req.body;

  try {
    await pool.query(
      'INSERT INTO assessments (patient_id, vision_acuity) VALUES ($1, $2)',
      [patientId, visionAcuity]
    );
    res.status(201).json({ message: 'Assessment recorded successfully' });
  } catch (error) {
    console.error('Error recording assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// server.js
app.get('/api/get-patients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patients');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Error fetching patients' });
  }
});

app.post('/api/insert-patient', async (req, res) => {
  const { firstName, middleName, lastName, dateOfBirth, gender, phoneNumber, address, city, kebele } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO patients (first_name, middle_name, last_name, date_of_birth, gender, phone_number, address, city, kebele) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING card_no',
      [firstName, middleName, lastName, dateOfBirth, gender, phoneNumber, address, city, kebele]
    );

    res.status(201).json({ message: 'Patient registered successfully', patientId: result.rows[0].id });
  } catch (error) {
    console.error('Error inserting patient:', error);
    res.status(500).json({ error: 'at the back' });
  }
});
app.post('/api/submit-assessment', async (req, res) => {
  const { vaOD, vaOS, chiefComplaint, shortHistory, diagnosis,  treatment, card_no } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO assessment (vaod, vaos, cc, sh, diagnosis,  treatmnet, card_no) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING id',
      [vaOD, vaOS, chiefComplaint, shortHistory, diagnosis,  treatment, card_no]
    );

    res.status(201).json({ message: 'Assesment recorded successfully', patientId: result.rows[0].id });
  } catch (error) {
    console.error('Error recording assessment:', error);
    res.status(500).json({ error: 'at the back' });
  }
});
app.post('/api/get-assessment', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM assessment where card_no ='IDN495386' ");
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Error fetching patients' });
  }
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'stdassign22@gmail.com',
    pass: 'zafm yjmt vtoi qkst'  // Use App password if 2-Step Verification is enabled
  }
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'stdassign22@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: error.toString() });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  });
