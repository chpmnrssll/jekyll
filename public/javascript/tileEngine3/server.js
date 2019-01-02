var webSocketServer = require('websocket').server;
var http = require('http');
var serverPort = 8080;
var users = [];

var server = http.createServer(function(request, response) {});
server.listen(serverPort, function() { console.log('Server is listening on port ' + serverPort); });

var wsServer = new webSocketServer({ httpServer: server });

setInterval(function () {
	for(var i in users) {
		if(users[i]) {
			users[i].x += users[i].vx;
			users[i].y += users[i].vy;
			var payload = JSON.stringify({
				event: 'user_position',
				data: {
					id: users[i].id,
					x: users[i].x,
					y: users[i].y,
					vx: users[i].vx,
					vy: users[i].vy
					}
				}
			);
			broadcast(payload, users[i]);
		}
	}
}, 100);

function broadcast(payload, currentUser) {
	for(var i in users) {
		if(users[i]) {
			if(users[i] !== currentUser) {
				users[i].connection.sendUTF(payload);
			}
		}
	}
}

function addUser(connection) {
	var i = 0;
	for(i = 0;  i < users.length; i++) {
		if(users[i] === null) {
			break;
		}
	}
	
	var user = {
		connection: connection,
		id: i,
		name: '',
		x: 0,
		y: 0,
		vx: 0,
		vy: 0
	}
	
	users[i] = user;
	return user;
}

wsServer.on('request', function(request) {
	console.log(' Player ' + user.id + ' connected.');
	var connection = request.accept(null, request.origin);
	var user = addUser(connection);
	
	connection.sendUTF(JSON.stringify({
		event: 'user_id',
		data: {
			id: user.id
		}
	}));
	
	//console.log(' Player ' + user.id + ' connected.');
	
	connection.on('message', function(message) {
		var json = JSON.parse(message.utf8Data);
		var event = json.event;
		var data = json.data;
		
		if(event == 'user_position') {
			if((users[data.id].x != data.x)||(users[data.id].y != data.y)) {
				//setTimeout(function() {
				users[data.id].x = data.x;
				users[data.id].y = data.y;
				users[data.id].vx = data.vx;
				users[data.id].vy = data.vy;
				//}, 600);						//LAG/Ping test ms
			}
		}
		else if(event == 'user_chat') {
			broadcast(JSON.stringify({
				event: 'user_chat',
				data: {
					msg: users[data.id].name + ': ' + data.msg
				}
			}), users[data.id]);
		}
		else if(event == 'user_died') {
			broadcast(JSON.stringify({
				event: 'user_died',
				data: {
					name: users[data.id].name,
					reason: data.reason
				}
			}), users[data.id]);
		}
		else if(event == 'user_name') {
			users[data.id].name = data.name;
			broadcast(JSON.stringify({
				event: 'user_connected',
				data: {
					id: data.id,
					name: data.name
				}
			}), users[data.id]);
		}
	});
	
	connection.on('close', function(reasonCode, description) {
		broadcast(JSON.stringify({
			event: 'user_disconnected',
			data: {
				id: user.id,
				name: user.name
			}
		}), users[user.id]);
		
		console.log(' Player ' + user.id + ' disconnected.');
		users[user.id] = null;
		connection.close();
    });
	
});