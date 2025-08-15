import express from 'express';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

app.get("/", (req, res) => {
  res.send("Hello, Express with ES Modules!");
});

app.post('/api/submit-form',(req,res)=>{
   const {email,password}=req.body;
   if(!email || !password){
        return res.status(400).json({message:"Email and Password are required fields!"})
   }
   else{
   console.log("Received from data:",{email,password});
   return res.json({message:"successfully!"});
   }

});

app.post('/api/submit-signup',(req,res)=>{
    const {firstname,lastname,dob,email,password}=req.body;
    if(!firstname || !lastname || !dob || !email || !password){
      return res.status(400).json({message:"Email and Password are required fields!"})
    }
    else{
    console.log("Received from data:",{firstname,lastname,dob,email,password});
    return res.json({message:"successfully!"});
    }

});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
