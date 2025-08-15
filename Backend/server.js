import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Client } = pkg;

const connectionString=""; // Get the link from Neon Serverless Database

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to Neon using DATABASE_URL (much simpler than multiple vars)
const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false } // Important for Neon SSL
});

// Function to connect DB
const connectDB = async () => {
  try {
    await client.connect();
    console.log("✅ Connected to Neon PostgreSQL");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1); // Stop app if DB connection fails
  }
};

await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 Routes
app.get("/", (req, res) => {
  res.send("Hello, community!");
});

app.post('/api/submit-form', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required fields!" });
  }

  console.log("Received form data:", { email, password });

  // OPTIONAL: Store in DB example
  // await client.query("INSERT INTO logins (email, password) VALUES ($1, $2)", [email, password]);

  return res.json({ message: "Form submitted successfully!" });
});

app.post('/api/submit-signup', async (req, res) => {
  const { firstname, lastname, dob, email, password } = req.body;

  if (!firstname || !lastname || !dob || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  console.log("Received signup data:", { firstname, lastname, dob, email, password });


  return res.json({ message: "Signup successful!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});