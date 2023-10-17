import express from "express";
import "dotenv/config";
import "./db.js";

const app = express();

app.use(express.json());

app.use(express.static("./public"));

app.listen(3000, () => {
    console.log("Books app listening on port 3000");
});