const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const authRouter = require("./routes/auth");
const documentRoute = require("./routes/document");
const Document = require("./models/document");

const PORT  = process.env.PORT | 3001;

const app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);


app.use(express.json());

app.use(authRouter);
app.use(documentRoute);

app.use(cors());


const DB = "mongodb+srv://Dilshad97:Rayeen%40786@cluster0.fotw15y.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(DB).then(()=>{
console.log(`Connection successful to the Database `)

}).catch((err)=>{
    console.log("ERROR=============")
console.log(err);
})

io.on("connection", (socket) => {
    socket.on("join", (documentId) => {
        socket.join(documentId);
        console.log("Joined!!!!");
    });

    socket.on("typing", (data) => {
        socket.broadcast.to(data.room).emit("changes", data);
    });

    socket.on("save", (data) => {
        saveData(data);
    });
});
const saveData = async (data) => {
    let document = await Document.findById(data.room);
    document.content = data.delta;
    document = await document.save();
}

server.listen(PORT,"0.0.0.0",()=>{
    console.log(`Connected at port ${PORT}`)
})