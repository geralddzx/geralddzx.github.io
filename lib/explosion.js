var Explosion = Xpace.Explosion = function(game, pos, spread){
	this.game = game
	this.pos = pos
	this.spread = spread
	this.setMorph()
	this.setImage()
	this.playSound()
}

Explosion.prototype.setMorph = function(){
	this.morph = Explosion.MORPH * Math.random()
	this.radius = Explosion.MINSIZE
}

Explosion.prototype.playSound = function(){
	this.morph = Explosion.MORPH * Math.random()
	this.radius = Explosion.MINSIZE
}

Explosion.prototype.step = function(){
	this.radius = this.radius + this.morph
	this.morph = this.morph + 0.01
	if (this.radius >= this.spread){
		this.morph = this.morph * -1
	} else if (this.radius < Explosion.MINSIZE){
		this.destroy()
	}
}

Explosion.prototype.setImage = function(){
	this.image = $('<img src = "explosion.png">')[0]
	// this.radius = Explosion.SEEDSIZE
}

Explosion.prototype.draw = function(){
	var width = this.radius * 2
	var height = this.radius * 2
	ctx.drawImage(this.image, this.pos[0] - width / 2, this.pos[1] - height / 2, width, height)
}

Explosion.prototype.destroy = function(){
	this.game = null
}

Explosion.prototype.playSound = function(){
	var sound = new Audio('explosion.mp3')
	sound.volume = Math.min(this.spread * this.spread / 1000, 1)
	sound.play()
}

// Explosion.SOUND = 

Explosion.MORPH = 2.5
Explosion.MINSIZE = 0
