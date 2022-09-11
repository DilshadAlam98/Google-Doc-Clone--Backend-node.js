const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");

const PORT  = process.env.PORT | 3001;

const app = express();


app.use(express.json());

app.use(authRouter);

app.use(cors());


const DB = "mongodb+srv://Dilshad97:Rayeen%40786@cluster0.fotw15y.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(DB).then(()=>{
console.log(`Connection successful to the Database `)

}).catch((err)=>{
    console.log("ERROR=============")
console.log(err);
})


app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Connected at port ${PORT}`)
})