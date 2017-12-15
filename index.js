var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var streamTitle = require('stream-title');
const u = require('url');
const rp = require('request-promise');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});




function ShoutcastV2(url, sid) {

    if(typeof url === 'undefined')
        throw new Error('required url');

    if(typeof sid === 'undefined')
        throw new Error('required sid');

    url = url + '/stats?sid=' + sid + '&json=1';

    return rp(url).then(function (body) {
        let data = JSON.parse(body);
        return data
    });

}






function VerStreaming(args) {

    if(typeof args.type === 'undefined')
        throw new Error('required type');

    switch (args.type) {
        case 'shoutcast2':
            return ShoutcastV2(args.url, args.sid);
            break;

        case 'icecast':
            return getByIcecast(args.url, args.mount);
            break;

        case 'shoutcast':
            return getByShoutcast(args.url);
            break;
    }

}











io.on('connection', function(socket){
	
		
	
		
							 
  socket.on('estado streaming', function(msg){
  console.log('listening on *:' + msg);
	
	
	  VerStreaming({
    url: 'http://s2.netradiofm.com:'+streaming,
    type: 'shoutcast2',
    sid: 1
}).then(function (data) {
    console.log(data['songtitle']);
    io.emit('estado streaming', '{"id":"'+data['streamhits']+'","sonando":"'+data['songtitle']+'","estado":"'+data['streamstatus']+'","puerto":"'+streaming+'"}');
}).catch(function (err) {
    console.log(err);
});

	  
  streamTitle({
    url: 'http://s2.netradiofm.com:'+msg,
    type: 'shoutcast2',
    sid: 1
}).then(function (data) {
    console.log(data);
    io.emit('estado streaming', '{"tema":true,"portada":"'+data+'","programa":"'+data['streamstatus']+'"}');
}).catch(function (err) {
    console.log(err);
});


});
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
