const targetFPS = 60;
const worldFPS = 30;
const transFPS = 10;
const friction = 0.9;

var localPlayer = new Player();

window.onload = function() {
	engine.init();
	setInterval(render, 1000/targetFPS);
	setInterval(transmit, 1000/transFPS);
	setInterval(correct, 1000/(transFPS/2));
	setInterval(update, 1000/worldFPS);
	//setInterval(engine.network.ping, 1000);
	//setInterval(function () { engine.outputConsole(engine.network.pingTime); }, 1000);
}

function render() {
	engine.context.fillStyle = '#000';
	engine.context.fillRect(0,0, engine.canvas.width,engine.canvas.height);
	
	engine.context.fillStyle = 'rgba(0,0,255,0.5)';
	for(var i in engine.network.users) {
		drawTank(engine.network.users[i].pos.x,engine.network.users[i].pos.y, engine.network.users[i].rot, engine.network.users[i].r,engine.network.users[i].g,engine.network.users[i].b, 0.25);
	}
	
	drawTank(localPlayer.pos.x,localPlayer.pos.y, localPlayer.rot, localPlayer.r,localPlayer.g,localPlayer.b, 1.0);
	engine.timer.tick();
}

function RGBAtoHEX(r,g,b,a) {
	r = r>>0;
	g = g>>0;
	b = b>>0;
	return 'rgba(' + Math.min(r, 255) + ',' + Math.min(g, 255) + ',' + Math.min(b, 255) + ',' + a + ')';
}

function drawTank(x,y, rot, r,g,b,a) {
	engine.context.save();
	engine.context.translate(x,y);
	engine.context.rotate(rot * (Math.PI/180.0));
	engine.context.fillStyle = RGBAtoHEX(r,g,b,a);
	engine.context.fillRect(-6,-8, 12,14);
	engine.context.fillStyle = RGBAtoHEX(r*2,g*2,b*2,a);
	engine.context.fillRect(-4,-4, 8,8);
	engine.context.fillStyle = RGBAtoHEX(r*3,g*3,b*3,a)
	engine.context.fillRect(-1,-1, 2,12);
	engine.context.restore();
}

function transmit() {
	engine.network.send('user_keys', { keys: engine.keyDown });
}

function correct() {
	var remote = engine.network.users[engine.network.userID];
	if((localPlayer.pos.x - remote.pos.x > 8)||(localPlayer.pos.y - remote.pos.y > 8)) {
		engine.network.send('user_state', { pos: localPlayer.pos, vel: localPlayer.vel, rot: localPlayer.rot });
		engine.outputConsole('correct ' + Math.random());
	}
}

function update() {
	if(engine.keyDown[KEY.UP]) {
		thrust(localPlayer, 1);
	}
	if(engine.keyDown[KEY.DOWN]) {
		thrust(localPlayer, -1);
	}
	if(engine.keyDown[KEY.LEFT]) {
		localPlayer.rot -= 7.5;
	}
	if(engine.keyDown[KEY.RIGHT]) {
		localPlayer.rot += 7.5;
	}
	engine.clearKeys();
	
	localPlayer.pos.x += localPlayer.vel.x;
	localPlayer.pos.y += localPlayer.vel.y;
	localPlayer.vel.x *= friction;
	localPlayer.vel.y *= friction;
	if(localPlayer.pos.x < 0) { localPlayer.pos.x += 640; }
	else { localPlayer.pos.x %= 640; }
	if(localPlayer.pos.y < 0) { localPlayer.pos.y += 480; }
	else { localPlayer.pos.y %= 480; }
	/*
	for(var i in engine.network.users) {
		engine.network.users[i].pos.x += engine.network.users[i].vel.x;
		engine.network.users[i].pos.y += engine.network.users[i].vel.y;
		engine.network.users[i].vel.x *= friction;
		engine.network.users[i].vel.y *= friction;
		
		if(engine.network.users[i].pos.x < 0) { engine.network.users[i].pos.x += 640; }
		else { engine.network.users[i].pos.x %= 640; }
		if(engine.network.users[i].pos.y < 0) { engine.network.users[i].pos.y += 480; }
		else { engine.network.users[i].pos.y %= 480; }
	}
	*/
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
