var Vec2 = function(x, y) {
	this.x = x;
	this.y = y;
};

var Player = function() {
	this.pos = new Vec2(320, 240);
	this.vel = new Vec2(0, 0);
	this.rot = 0;
	this.r = 0;
	this.g = 0;
	this.b = 0;
};
