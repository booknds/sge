/**
 * Created by eric on 3/15/16.
 */
const express = require("express");

const app = express();
const port = 3030;

app.use("/dist", express.static("./dist"));

app.get("*", (req, res) => {
    res.sendFile("./index.html", { root: __dirname });
})

console.log("listening on port 3030");
app.listen(port);
