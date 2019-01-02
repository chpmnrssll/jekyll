engine.map = {};
engine.map.list = {};
engine.map.current = -1;
engine.map.width = 0;
engine.map.height = 0;

engine.map.set = function(mapID) {
	if(engine.map.list[mapID] && (engine.map.current != mapID)) {
		engine.map.current = mapID;
		engine.map.width = engine.map.list[engine.map.current][0].length;
		engine.map.height = engine.map.list[engine.map.current].length;
		engine.viewport.x = 0;
		engine.viewport.y = 0;
		engine.screen.tilesPerRow = Math.min(Math.floor(engine.canvas.width/(engine.tile.spriteSheet.tileWidth)), engine.map.width);
		engine.screen.tilesPerCol = Math.min(Math.floor(engine.canvas.height/(engine.tile.spriteSheet.tileHeight)), engine.map.height);
		}
};

engine.map.load = function(file, callBack) {
	var handle = new XMLHttpRequest();
	
	if(handle.overrideMimeType) {
		handle.overrideMimeType('application/json');
	}
	
	engine.outputConsole('Loading map: "' + file + '"');
	handle.open('get', file, true);
	handle.onreadystatechange = function () {
		if(this.readyState == 4 && this.status != 404) {
			var json = JSON.parse(this.responseText.replace(/\n/g, ''));
			engine.map.list[json.mapID] = json.map;
			if(callBack) {
				callBack();
			};
		}
	};
	
	handle.send(null);
};

engine.map.draw = function() {
	var xMin = Math.floor(engine.viewport.x/engine.tile.spriteSheet.tileWidth);
	var yMin = Math.floor(engine.viewport.y/engine.tile.spriteSheet.tileHeight);
	var xMax = Math.min(xMin+engine.screen.tilesPerRow+1, engine.map.width);
	var yMax = Math.min(yMin+engine.screen.tilesPerCol+1, engine.map.height);
	var i, j, type, tile;
	
	for(i = yMin; i < yMax; i++) {
		for(j = xMin; j < xMax; j++) {
			type = engine.map.list[engine.map.current][i][j];
			if(type != 0) {
				tile = engine.tile.spriteSheet.getOffset(type);
				
				for(var k = 0; k < engine.tile.animations.length; k++) {
					if(type == engine.tile.animations[k].frames[0]) {
						tile = engine.tile.animations[k].getOffset();
						break;
					}
				}
				
				if(tile) {
					engine.context.drawImage(engine.tile.image, tile.x,tile.y, tile.width,tile.height, (j*tile.width)-engine.viewport.x,(i*tile.height)-engine.viewport.y, tile.width,tile.height);
				}
			}
		}
	}
};
