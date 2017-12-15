var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var streamTitle = require('stream-title');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
							 
							 
  socket.on('estado streaming', function(msg){
  console.log('listening on *:' + msg);
	  
	  
  streamTitle({
    url: 'http://s2.netradiofm.com:'+msg,
    type: 'shoutcast2',
    sid: 1
}).then(function (title) {
    console.log(title);
    io.emit('estado streaming', title);
}).catch(function (err) {
    console.log(err);
});


});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
