const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is succcessfully running, and app is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
});

app.get("/", onLoad);

function onLoad(req, res) {
    res.send("Hello world");
}