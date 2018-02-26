const gravity = 0.35;
const friction = 0.88;
const walkSpeed = 0.35;

var player = function(x, y, img, controller) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.sx = 0;
	this.sy = 0;
	this.dead = false;
	this.jumpTimeout = 0;
	this.canJump = true;
	this.hitTop = false;
	this.hitBot = false;
	this.hitLeft = false;
	this.hitRight = false;
	this.controller = controller;
	this.msg = null;
	this.img = new Image();
	this.img.src = img;
	
	this.draw = function() {
		if(this.controller == 'local') {
			engine.context.drawImage(this.img, this.sx, this.sy);
			if(this.msg) {
				engine.context.fillStyle = '#FFF';
				engine.context.fillText(this.msg, this.sx, this.sy-16);
			}
		}
		else {
			var x = this.x-engine.viewport.x;
			var y = this.y-engine.viewport.y;
			engine.context.drawImage(this.img, x,y);
			if(this.msg) {
				engine.context.fillStyle = '#FFF';
				engine.context.fillText(this.msg, x, y-16);
			}
		}
	};
	
	this.move = function(x, y) {
		var hw = this.img.width >> 1;
		var hh = this.img.height >> 1;
		var cx = this.x+this.vx+hw;
		var cy = this.y+(this.vy >> 1)+hh;
		
		var l = Math.floor((cx-hw) / engine.tile.spriteSheet.tileWidth);
		var r = Math.floor((cx+hw) / engine.tile.spriteSheet.tileWidth);
		var t = Math.floor((cy-hh) / engine.tile.spriteSheet.tileHeight);
		var b = Math.floor((cy+hh) / engine.tile.spriteSheet.tileHeight);
		cx = Math.floor(cx/engine.tile.spriteSheet.tileWidth);
		cy = Math.floor(cy/engine.tile.spriteSheet.tileHeight);
		
		l = Math.max(Math.min(engine.map.width, l), 0);
		r = Math.max(Math.min(engine.map.width, r), 0);
		t = Math.max(Math.min(engine.map.height, t), 0);
		b = Math.max(Math.min(engine.map.height, b), 0);
		cx = Math.max(Math.min(engine.map.width, cx), 0);
		cy = Math.max(Math.min(engine.map.height, cy), 0);
		
		this.hitTop = engine.map.list[engine.map.current][t][cx] !== 0;
		this.hitBot = engine.map.list[engine.map.current][b][cx] !== 0;
		this.hitLeft = engine.map.list[engine.map.current][cy][l] !== 0;
		this.hitRight = engine.map.list[engine.map.current][cy][r] !== 0;
		
		if(y < 0) {
			if(this.hitTop) { this.vy -= this.vy*1.5; }
			else { this.y += y; }
		} else {
			if(this.hitBot) { this.vy -= this.vy; }
			else { this.y += y; }
		}
		
		if(x < 0) {
			if(this.hitLeft) { this.vx -= this.vx; }
			else { this.x += x; }
		} else {
			if(this.hitRight) { this.vx -= this.vx; }
			else { this.x += x; }
		}
	};
	
	this.process = function() {
		if(!this.hitBot) {
			this.vy += gravity;
			this.vx *= friction+0.0025;
		}
		else {
			this.vx *= friction;
		}
		
		if(this.vx > 0) {
			if(this.vx < 0.05) this.vx -= this.vx;
		} else {
			if(this.vx > -0.05) this.vx -= this.vx;
		}
		
		this.move(this.vx+0.5, this.vy);
		this.x = this.x >> 0;
		this.y = this.y >> 0;
		
		if(this.controller == 'local') {
			if((!this.dead)&&(this.y >= (engine.map.height-1.5)*engine.tile.spriteSheet.tileHeight)) {
				this.dead = true;
				engine.network.send('user_died', { id: engine.network.userID, reason: 'falling' });
				setTimeout(
					function() {
						localPlayer.vx = 0;
						localPlayer.vy = 0;
						localPlayer.x = 50;
						localPlayer.y = 0;
						localPlayer.dead = false;
						engine.viewport.set(localPlayer.x-engine.screen.height2, localPlayer.y-engine.screen.height2);
					},
				1000);
			}
			else {
				engine.viewport.set(this.x-engine.screen.height2, this.y-engine.screen.height2);
				this.sx = this.x-engine.viewport.x;
				this.sy = this.y-engine.viewport.y;
			}
		}
	};
	
	this.control = function() {
		if(!engine.chatting) {
			if(engine.keys[KEY.UP] && this.canJump) {
				this.vy -= this.jumpTimeout*gravity;
				this.jumpTimeout++;
				if(this.jumpTimeout > 6) {
					this.canJump = false;
					this.jumpTimeout = 0;
				}
			}
			if(engine.keys[KEY.RIGHT]) {
				this.vx += walkSpeed;
			}
			if(engine.keys[KEY.LEFT]) {
				this.vx += -walkSpeed;
			}
			if(!engine.keys[KEY.UP] && this.hitBot) {
				this.canJump = true;
				this.jumpTimeout = 0;
			}
			
			if(engine.keys[KEY.talk]) {
				engine.chatting = true;
				engine.chatInput.focus();
			}
		}
		else if(engine.keys[KEY.ESC]) {
			engine.chatInput.value = '';
			engine.chatInput.blur();
			engine.chatting = false;
		}
	};
};
