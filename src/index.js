const express = require("express");
const app = express();
const noteRouter = require("./routes/notesRoutes");
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");
app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.get("/", (req,res)=>{
    res.send("<h1>Welcom Home</h1>");
});
mongoose.connect("mongodb+srv://Piyus123:Piyus123@cluster0.u3kbsxa.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(5000,()=>{
        console.log("Server started at 5000");
    });

}).catch((error)=>{
    console.log(error)
})


