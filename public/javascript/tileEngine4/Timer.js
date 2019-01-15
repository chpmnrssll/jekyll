var Timer = function() {
	this.elapsed = 0;
	this.lastTick = (new Date()).getTime();
	
	this.tick = function() {
		var currentTick = (new Date()).getTime();
		this.elapsed = currentTick - this.lastTick;
		this.lastTick = currentTick;
	};
};
