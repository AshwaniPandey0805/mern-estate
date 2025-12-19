import express from "express";
const app = express();

app.get('/check', (req, res) => {
    res.write('<h1>Server is running</h1>')
    res.end();
});

app.listen(3000, () => {
    console.log("Serve is running on port 3000");
});