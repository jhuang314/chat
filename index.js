var express = require("express");
var app = express();
var port = 8080;

app.get("/", function(req, res) {
    res.send("it works!");
});

app.listen(port);
console.log("Listening on port " + port);
