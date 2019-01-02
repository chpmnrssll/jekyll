engine.timer = {};
engine.timer.elapsed = 0;
engine.timer.lastTick = (new Date()).getTime();

engine.timer.tick = function() {
	var currentTick = (new Date()).getTime();
	engine.timer.elapsed = currentTick - engine.timer.lastTick;
	engine.timer.lastTick = currentTick;
};

engine.timer.getSeconds = function() {
	var seconds = engine.timer.elapsed / 1000;
	if(isNaN(seconds)) {
		return 0;
	}
	return seconds;
};
