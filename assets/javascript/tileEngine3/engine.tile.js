engine.tile = {};
engine.tile.image = new Image();

engine.tile.load = function(file, callBack) {
	var handle = new XMLHttpRequest();
	if(handle.overrideMimeType) {
		handle.overrideMimeType('application/json');
	}
	
	engine.outputConsole('Loading tileset: "' + file + '"');
	handle.open('get', file+"?id="+Math.random(), true);
	handle.onreadystatechange = function () {
		if(this.readyState == 4 && this.status != 404) {
			var json = JSON.parse(this.responseText.replace(/\n/g, ''));
			
			engine.tile.image.src = json.image;
			engine.screen.tilesPerRow = Math.min(Math.floor(engine.canvas.width/json.tileWidth), engine.map.width||0);
			engine.screen.tilesPerCol = Math.min(Math.floor(engine.canvas.height/json.tileHeight), engine.map.height||0);
			
			var tilesPerRow = Math.floor(engine.tile.image.width/json.tileWidth);
			var tilesPerCol = Math.floor(engine.tile.image.height/json.tileHeight);
			var numTiles = tilesPerRow * tilesPerCol;
			var tmp = {}, x = 0, y = 0;
			
			for(var i = 1; i <= numTiles; i++) {
				tmp[i] = { id: i, x: x, y: y };
				if(x < tilesPerRow-1) {
					x++;
				}
				else {
					x = 0;
					y++;
				}
			}
			
			engine.tile.spriteSheet = new spriteSheet(json.tileWidth, json.tileHeight, tmp);
			engine.tile.animations = [];
			for(var i = 0; i < json.animations.length; i++) {
				engine.tile.animations[i] = new animation(json.animations[i][0], json.animations[i][1], engine.tile.spriteSheet);
			}
			
			if(callBack) {
				callBack();
			};
		}
	};
	
	handle.send(null);
};
