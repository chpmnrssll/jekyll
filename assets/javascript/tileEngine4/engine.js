var engine = {};

engine.init = function() {
	engine.canvas = document.getElementById('canvas');
	engine.context = engine.canvas.getContext('2d');
	engine.console = document.getElementById('console');
	
	document.onkeydown = engine.keydown;
	document.onkeyup = engine.keyup;
	engine.network.init();
	engine.timer = new Timer();
	engine.timer.tick();
	engine.outputConsole("Engine initialized.");
};

engine.outputConsole = function(message) {
	var tmp = engine.console.innerHTML;
	engine.console.innerHTML = message + '<br/>' + tmp;
};
