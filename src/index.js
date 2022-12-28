const express = require("express");
const app = express();
const noteRouter = require("./routes/notesRoutes");
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.use(cors()); // this is also a middleware it will add headers to every response
app.get("/", (req,res)=>{
    res.send("<h1>Welcom TO NOTES API</h1>");
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started at"+PORT);
    });

}).catch((error)=>{
    console.log(error)
})


