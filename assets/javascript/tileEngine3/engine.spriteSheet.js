var spriteSheet = function(tileWidth, tileHeight, sprites) {
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
	this.sprites = sprites;
	
	this.getOffset = function(spriteID) {
		var sprite = this.sprites[spriteID];
		if(sprite) {
			return {
				x: (sprite.x * this.tileWidth),
				y: (sprite.y * this.tileHeight),
				width: this.tileWidth,
				height: this.tileHeight
			};
		}
		return null;
	};
};
