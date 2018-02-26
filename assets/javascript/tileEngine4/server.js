const worldFPS = 30;
const transFPS = 10;
const friction = 0.9;

const KEY = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
};

var Vec2 = function(x, y) {
	this.x = x;
	this.y = y;
};

var Player = function(id) {
	this.pos = new Vec2(320, 240);
	this.vel = new Vec2(0, 0);
	this.rot = 0;
	this.id = id;
	this.r = 0;
	this.g = 0;
	this.b = 0;
};

var ws = require("websocket-server");
var server = ws.createServer({ debug: false });
var users = [];

console.log('Sever Started');
setInterval(update, 1000/worldFPS);

function update() {
	for(var i in users) {
		if(users[i]) {
			if(users[i].keys[KEY.UP]) {
				thrust(users[i].player, 1);
			}
			if(users[i].keys[KEY.DOWN]) {
				thrust(users[i].player, -1);
			}
			if(users[i].keys[KEY.LEFT]) {
				users[i].player.rot -= 7.5;
			}
			if(users[i].keys[KEY.RIGHT]) {
				users[i].player.rot += 7.5;
			}
			
			users[i].player.pos.x += users[i].player.vel.x;
			users[i].player.pos.y += users[i].player.vel.y;
			
			users[i].player.vel.x *= friction;
			users[i].player.vel.y *= friction;
			
			if(users[i].player.pos.x < 0) { users[i].player.pos.x += 640; }
			else { users[i].player.pos.x %= 640; }
			if(users[i].player.pos.y < 0) { users[i].player.pos.y += 480; }
			else { users[i].player.pos.y %= 480; }
		}
	}
}

function thrust(player, direction) {
	var angle = player.rot * (Math.PI / 180.0);
	if(direction == 1) {
		player.vel.x -= Math.sin(angle);
		player.vel.y += Math.cos(angle);
	}
	else {
		player.vel.x += Math.sin(angle);
		player.vel.y -= Math.cos(angle);
	}
}

function packageJSON(eventName, eventData) {
	return JSON.stringify({ event: eventName, data: eventData });
}

server.addListener("connection",
	function(connection) {
		users[connection.id] = {}
		users[connection.id].keys = [];
		users[connection.id].player = new Player(connection.id);
		users[connection.id].r = (Math.random()*255) >> 0;
		users[connection.id].g = (Math.random()*255) >> 0;
		users[connection.id].b = (Math.random()*255) >> 0;
		
		console.log('player connected');
		
		connection.send(packageJSON('user_id', { id: connection.id }));
		connection.send(packageJSON('user_connected', { id: connection.id, r: users[connection.id].r, g: users[connection.id].g, b: users[connection.id].b }));
		connection.broadcast(packageJSON('user_connected', { id: connection.id, r: users[connection.id].r, g: users[connection.id].g, b: users[connection.id].b }));
		
		users[connection.id].transmit = setInterval(
			function () {
				var p = [];
				for(var i in users) {
					if(users[i]) {
						p.push(users[i].player);
					}
				}
				
				connection.send(packageJSON('user_updates', { players: p }));
				connection.broadcast(packageJSON('user_updates', { players: p }));
			},
		1000/transFPS);
		
		connection.addListener("message",
			function(input) {
				var json = JSON.parse(input);
				
				if(json.event == 'user_keys') {
					users[connection.id].keys = json.data.keys;
				}
				if(json.event == 'user_state') {
					users[connection.id].player.pos.x = (users[connection.id].player.pos.x+json.data.pos.x) >> 1;
					users[connection.id].player.pos.y = (users[connection.id].player.pos.y+json.data.pos.y) >> 1;
					users[connection.id].player.vel = json.data.vel;
					users[connection.id].player.rot = json.data.rot;
				}
				else if(json.event == 'get_users') {
					connection.send(packageJSON('user_list', { users: users }));
				}
				else if(json.event == 'ping') {
					connection.send(packageJSON('pong', json.data));
				}
			}
		);
		
		connection.addListener("close",
			function() {
				connection.broadcast(packageJSON('user_disconnected', connection.id));
				connection.close();
				clearInterval(users[connection.id].transmit);
				delete users[connection.id];
			}
		);
	}
);

server.listen(1234);
