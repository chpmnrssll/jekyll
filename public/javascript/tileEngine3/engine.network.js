engine.network = {};

engine.network.init = function() {
	//engine.websocket = new WebSocket('ws://174.24.125.35:8080');
	engine.websocket = new WebSocket('ws://chpmn.lonelydev.org:8080');
	//engine.websocket = new WebSocket('ws://localhost:8080');
	
	engine.websocket.onopen = function() {
		engine.outputConsole("Connected to server.");
		engine.outputChatbox('<span style="color:#8AF">Hello player.</span> <span style="color:#8FA">Press <span style="color:#FF0">(T)</span> to talk.</span>');
	};
	
	engine.websocket.onclose = function() {
		engine.outputConsole("Disconnected from server.");
		engine.outputChatbox('<span style="color:#F84">Goodbye Player.</span>');
	};
	
	engine.websocket.onmessage = function(input) {
		var json = JSON.parse(input.data);
		engine.network.dispatch(json.event, json.data);
	};
	
	engine.network.callbacks = {};
	engine.network.userName = null;
	engine.network.userID = null;
	engine.network.users = [];
	
	engine.network.bind = function(eventName, callback) {
		engine.network.callbacks[eventName] = engine.network.callbacks[eventName] || [];
		engine.network.callbacks[eventName].push(callback);
	};
	
	engine.network.send = function(eventName, eventData) {
		var payload = JSON.stringify({ event: eventName, data: eventData });
		engine.websocket.send(payload);
	};
	
	engine.network.dispatch = function(eventName, message) {
		var chain = engine.network.callbacks[eventName];
		if(typeof chain == 'undefined') return;	//no callbacks for this event
		for(var i = 0; i < chain.length; i++) {
			chain[i](message);
		}
	};
	
	engine.network.bind('user_connected',
		function(user) {
			engine.outputChatbox(user.name + ' has joined the game.');
			if(engine.network.userID != user.id) {
				engine.network.users[user.id] = new player(160,0, "javascript/tileEngine3/gfx/mario_sm_1.gif", user.id);
				engine.network.users[user.id].name = user.name;
			}
		}
	);
	
	engine.network.bind('user_disconnected',
		function(user) {
			engine.outputChatbox(user.name + ' has left the game.');
			delete engine.network.users[user.id];
		}
	);
	
	engine.network.bind('user_id',
		function(user) {
			engine.network.userID = user.id;
			engine.network.userName = prompt("Please enter your name:","");
			engine.outputConsole("id: " + user.id);
			if(engine.network.userName) {
				engine.network.send('user_name', { id: user.id, name: engine.network.userName });
			}
		}
	);
	
	engine.network.bind('user_chat',
		function(user) {
			engine.outputChatbox(user.msg);
		}
	);
	
	engine.network.bind('user_died',
		function(user) {
			engine.outputChatbox('<span style="color:#C40">' + user.name + ' died by ' + user.reason + '.</span>');
		}
	);
	
	engine.network.bind('user_position',
		function(user) {
			if(!engine.network.users[user.id]) {
				engine.network.users[user.id] = new player(160,0, "javascript/tileEngine3/gfx/mario_sm_1.gif", user.id);
				engine.network.users[user.id].vx = user.vx;
				engine.network.users[user.id].vy = user.vy;
				engine.network.users[user.id].x = user.x;
				engine.network.users[user.id].y = user.y;
			} else {
				var xerr = engine.network.users[user.id].x-user.x;
				var yerr = engine.network.users[user.id].y-user.y;
				engine.network.users[user.id].vx = user.vx;
				engine.network.users[user.id].vy = user.vy;
				
				if(Math.abs(xerr) > 0 || Math.abs(yerr) > 0) {
					engine.network.users[user.id].vx -= xerr >> 4;
					engine.network.users[user.id].vy -= yerr >> 4;
				}
				
				xerr = engine.network.users[user.id].x-user.x;
				yerr = engine.network.users[user.id].y-user.y;
				if(Math.abs(xerr)-8 > 16 || Math.abs(yerr)-8 > 64) {
					engine.network.users[user.id].x -= xerr;
					engine.network.users[user.id].y -= yerr;
				}
			}
		}
	);
};
