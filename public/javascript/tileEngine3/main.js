const scrollSpeed = 4;
const targetFPS = 60;
var localPlayer = new player(50,0, "javascript/tileEngine3/gfx/mario_sm_1.gif", 'local');

window.onload = function() {
	engine.init();
	engine.map.load("javascript/tileEngine3/map1-2.json",
		function () {
			engine.tile.load("javascript/tileEngine3/tileset.json",
				function () {
					engine.map.set(0);
					setInterval(render, 1000/targetFPS);
					setInterval(update, 100);
				}
			);
		}
	);
	engine.map.load("javascript/tileEngine3/map1-1.json");
}

function render() {
	engine.context.fillStyle = '#000';
	engine.context.fillRect(0,0, engine.canvas.width,engine.canvas.height);
	//engine.context.clearRect(0,0, engine.canvas.width,engine.canvas.height);
	
	for(var i = 0; i < engine.tile.animations.length; i++) {
		engine.tile.animations[i].animate(engine.timer.getSeconds());
	}
	
	engine.map.draw();
	localPlayer.control();
	localPlayer.process();
	localPlayer.draw();
	
	for(var i in engine.network.users) {
		engine.network.users[i].process();
		engine.network.users[i].draw();
	}
	
	engine.timer.tick();
	//engine.context.fillStyle = '#248';
	//engine.context.fillRect(2, 7, 38,12);
	//engine.context.fillStyle = '#FFF';
	//engine.context.fillText(Math.floor(1000 / engine.timer.elapsed) + " fps ", 4, 16);
}

function update() {
	if(engine.network.userID) {
		setTimeout(
			function () {
				engine.network.send('user_position', { id: engine.network.userID, x: localPlayer.x, y: localPlayer.y, vx: localPlayer.vx, vy: localPlayer.vy });
			},
		200);	//get velocity slightly later (important!)
	}
}
