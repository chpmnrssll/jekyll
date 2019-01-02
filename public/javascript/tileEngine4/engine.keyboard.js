const KEY = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
};

engine.keyDown = {};
engine.keyUp = {};
	
engine.keyDown = function(event) {
	for(var i in KEY) {
		engine.outputConsole(event.keyCode);
		if(event.keyCode == KEY[i]) {
			engine.keyDown[event.keyCode] = true;
			return false;
		}
	}
};

engine.keyup = function(event) {
	engine.keyUp[event.keyCode] = true;
};

engine.clearKeys = function() {
	for(var i in engine.keyUp) {
		if(engine.keyUp[i]) {
			engine.keyDown[i] = false;
			engine.keyUp[i] = false;
		}
	}
};
