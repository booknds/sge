/**
 * Created by eric on 3/15/16.
 */
const express = require("express");

const app = express();
const port = 3030;

console.log(__dirname);

app.use("/dist", express.static(__dirname + "/dist"));

app.get("*", (req, res) => {
    res.sendFile("./index.html", { root: __dirname });
});

app.listen(port);
console.log("listening on port 3030");
