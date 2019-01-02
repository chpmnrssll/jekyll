const KEY = {
	ESC: 27,
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	talk: 84,
	w: 87,
	s: 83,
	a: 65,
	d: 68
};

engine.keys = {};
	
engine.keyDown = function(event) {
	engine.keys[event.keyCode] = true;
	//engine.outputConsole(event.keyCode);
	if(!engine.chatting) {
		for(var i in KEY) {
			if(event.keyCode == KEY[i]) {
				return false;
			}
		}
	}
};

engine.keyUp = function(event) {
	engine.keys[event.keyCode] = false;
};
