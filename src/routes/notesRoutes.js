const express = require("express");
const noteRouter = express.Router();

noteRouter.get("/", (req,res)=>{
    res.send("Note get router")
});

noteRouter.post("/", (req,res)=>{
    res.send("Note post router")
});

module.exports = noteRouter;