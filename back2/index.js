const express = require('express');
const feedbackRoutes = require('../back2/Routes/feedbackroute');


const app= express();
const PORT= 3000;


app.get("/",(req,res)=>{
    res.send("API is running...");
});


app.use('/feedback', feedbackRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

});