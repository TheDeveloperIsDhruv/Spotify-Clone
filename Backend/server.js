import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
const { Client } = pkg;


dotenv.config();
// const connectionString="postgresql://neondb_owner:npg_NAlbDQti7y5L@ep-crimson-wave-aez6zso9-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"; // Get the link from Neon Serverless Database

// Check if it loaded
console.log('DATABASE_URL exists?', !!process.env.DATABASE_URL);
const app = express();
const PORT = process.env.PORT || 3000;
const connectionString=process.env.DATABASE_URL;
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
    process.exit(1); 
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

// Login endpoint - Fixed version
app.post('/api/submit-form', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required fields!" });
  }

  console.log("Received form data:", { email, password });

  try {
    // Fixed SQL syntax - correct spelling and parameter placeholders
    const result = await client.query(
      'SELECT email, password FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    // Check if user was found
    if (result.rows.length > 0) {
      return res.json({ message: "Login success!" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Database error occurred", error: error.message });
  }
});

// Signup endpoint - Fixed version
app.post('/api/submit-signup', async (req, res) => {
  const { firstname, lastname, dob, email, password } = req.body;

  if (!firstname || !lastname || !dob || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  console.log("Received signup data:", { firstname, lastname, dob, email, password });

  try {
    // The INSERT query always returns a result object, not a boolean
    const result = await client.query(
      "INSERT INTO users(firstname, lastname, dob, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [firstname, lastname, dob, email, password]
    );

    // Check if insert was successful
    if (result.rowCount > 0) {
      return res.json({ 
        message: "Signup successful!", 
        user: result.rows[0] 
      });
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Database error:", error);
    
    // Handle specific database errors
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({ message: "User with this email already exists" });
    }
    
    return res.status(500).json({ message: "Database error occurred", error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});