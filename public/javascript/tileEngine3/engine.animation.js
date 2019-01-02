var animation = function(frameTime, frames, spriteSheet) {
	this.frames = frames;
	this.frameTime = frameTime;
	this.spriteSheet = spriteSheet;
	this.elapsedTime = frameTime;
	this.currentFrame = 0;
	
	this.animate = function(deltaTime) {
		this.elapsedTime -= deltaTime;
		
		if(this.elapsedTime <= 0) {
			this.currentFrame++;
			if(this.currentFrame == this.frames.length) {
				this.currentFrame = 0;
			}
			this.elapsedTime = this.frameTime;
		}
	};
	
	this.getOffset = function() {
		return this.spriteSheet.getOffset(this.frames[this.currentFrame]);
	};
};
