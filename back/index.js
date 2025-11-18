const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const feedbackRoutes = require('./router/feedbackroute');

require('dotenv').config();
const app= express();
const PORT= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running...");
});


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});


app.use('/feedback', feedbackRoutes);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

});