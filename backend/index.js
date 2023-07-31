const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.send(`<h1>Server is running fine.</h1>`)
})

app.listen(PORT, () => {
    console.log(`Server running at PORT: ${PORT}`);
})