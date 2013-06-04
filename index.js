var express = require("express");
var app = express();
var port = 8080;

// setup jade
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res) {
    res.render("page");
});

app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port));

var count = 0;
io.sockets.on('connection', function(socket) {
    io.sockets.sockets['nickname'] = socket.id;
    count++;
    socket.emit('message', {message: 'welcome to the chat', count: count});
    socket.on('send', function(data) {
	io.sockets.emit('message', {message: data.message, username: data.username, count: count});
    });
    socket.on('disconnect', function () {
	count--;
    });



    
});


console.log("Listening on port " + port);

