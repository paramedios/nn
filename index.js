var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var axios = require('axios');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
						 
  socket.on('estado streaming', function(streaming){
  console.log('listening on *:' + streaming);
	
	
 
axios.get('http://s2.netradiofm.com:'+streaming+'/stats?sid=1&json=1')
  .then(response => {
    console.log(response.data.streamstatus);
    console.log(response.data.streamstatus);
	
io.emit('estado streaming', '{"id":"'+response.data.streamhits+'","sonando":"'+response.data.songtitle+'","estado":"'+response.data.streamstatus+'","puerto":"'+streaming+'"}');

	
  })
  .catch(error => {
    console.log(error);
  });
	

});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
