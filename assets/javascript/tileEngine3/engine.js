var engine = {};

engine.init = function() {
	engine.canvas = document.getElementById('canvas');
	engine.context = engine.canvas.getContext('2d');
	engine.console = document.getElementById('console');
	engine.chatBox = document.getElementById('chatBox');
	engine.chatInput = document.getElementById('chatInput');
	engine.chatting = false;
	
	engine.screen = {};
	engine.screen.width  = engine.canvas.width;
	engine.screen.height = engine.canvas.height;
	engine.screen.width2  = engine.canvas.width / 2;
	engine.screen.height2 = engine.canvas.height / 2;
	engine.screen.tilesPerRow = engine.canvas.width  / 16;
	engine.screen.tilesPerCol = engine.canvas.height / 16;

	document.onkeydown = engine.keyDown;
	document.onkeyup = engine.keyUp;
	engine.timer.tick();
	engine.outputConsole("Engine initialized.");
	engine.network.init();
};

engine.outputConsole = function(message) {
	var tmp = engine.console.innerHTML;
	engine.console.innerHTML = message + '<br/>' + tmp;
};

engine.outputChatbox = function(message) {
	var tmp = engine.chatBox.innerHTML;
	engine.chatBox.innerHTML += message + '<br/>';
	engine.chatBox.scrollTop = engine.chatBox.scrollHeight;
};

engine.chat = function (e, form) {
	if(e.keyCode == 13) {
		engine.network.send('user_chat', { id: engine.network.userID, msg: form.value });
		form.value = '';
		form.blur();
		engine.chatting = false;
	}
}
