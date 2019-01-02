engine.network = {};

engine.network.init = function() {
	engine.websocket = new WebSocket('ws://174.24.125.35:1234');
	engine.network.callbacks = {};
	engine.network.users = [];
	engine.network.pingTime = 0;
	engine.network.userID = null;
	
	engine.websocket.onopen = function() {
		engine.outputConsole("Connected to server.");
	};
	
	engine.websocket.onclose = function() {
		engine.outputConsole("Disconnected from server.");
	};
	
	engine.websocket.onmessage = function(input) {
		var json = JSON.parse(input.data);
		engine.network.dispatch(json.event, json.data);
	};
	
	engine.network.dispatch = function(eventName, message) {
		var chain = engine.network.callbacks[eventName];
		if(typeof chain == 'undefined') return;	//no callbacks for this event
		for(var i = 0; i < chain.length; i++) {
			chain[i](message);
		}
	};
	
	engine.network.send = function(eventName, eventData) {
		var payload = JSON.stringify({ event:eventName, data:eventData });
		engine.websocket.send(payload);
	};
	
	engine.network.ping = function() {
		engine.network.send('ping', (new Date()).getTime());
	};
	
	engine.network.bind = function(eventName, callback) {
		engine.network.callbacks[eventName] = engine.network.callbacks[eventName] || [];
		engine.network.callbacks[eventName].push(callback);
	};
	
	engine.network.bind('pong',
		function(data) {
			var pongTime = (new Date()).getTime();
			engine.network.pingTime = (pongTime-data)/2;
		}
	);
	
	engine.network.bind('user_id',
		function(data) {
			engine.network.userID = data.id;
		}
	);
	
	engine.network.bind('user_connected',
		function(data) {
			if(!engine.network.users[data.id]) {
				engine.network.users[data.id] = new Player();
				engine.network.users[data.id].r = data.r;
				engine.network.users[data.id].g = data.g;
				engine.network.users[data.id].b = data.b;
			}
			if(data.id == engine.network.userID) {
				localPlayer.r = data.r;
				localPlayer.g = data.g;
				localPlayer.b = data.b;
			}
		}
	);
	
	engine.network.bind('user_list',
		function(data) {
			for(var i in data) {
				if(!engine.network.users[data[i].id]) {
					engine.network.users[data[i].id] = new Player();
					engine.network.users[data[i].id].pos = data[i].pos;
					engine.network.users[data[i].id].vel = data[i].vel;
					engine.network.users[data[i].id].rot = data[i].rot;
					engine.network.users[data[i].id].r = data[i].r;
					engine.network.users[data[i].id].g = data[i].g;
					engine.network.users[data[i].id].b = data[i].b;
				}
			}
		}
	);
	
	engine.network.bind('user_disconnected',
		function(data) {
			delete engine.network.users[data];
		}
	);
	
	engine.network.bind('user_updates',
		function(data) {
			var players = data.players;
			for(var i in players) {
				if(!engine.network.users[players[i].id]) {
					engine.network.send('get_users', '');
					//engine.network.users[players[i].id] = new Player();
				}
				//else {
					setTimeout(function() {
					engine.network.users[players[i].id].pos = players[i].pos;
					engine.network.users[players[i].id].vel = players[i].vel;
					engine.network.users[players[i].id].rot = players[i].rot;
					}, 1000);	//ping 1000 ms
				//}
			}
		}
	);
};
