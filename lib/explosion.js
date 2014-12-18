var Explosion = Xpace.Explosion = function(object){
	this.game = object.game
	this.pos = object.position()
	this.terminalRadius = object.explosionRadius()
	this.setMorph()
	this.setImage()
	this.playSound()
	// this.vel = (object.vel || object.asteroid.vel)
}

Explosion.inherits(MovingObject)

Explosion.prototype.setMorph = function(){
	this.morph = Explosion.MORPH * Math.random()
	this.radius = Explosion.INITIALRADIUS
}

Explosion.prototype.step = function(){
	// this.move()
	this.radius = this.radius + this.morph
	this.morph = this.morph + 0.01
	if (this.radius >= this.terminalRadius){
		this.morph = this.morph * -1
	} else if (this.radius < Explosion.INITIALRADIUS){
		this.destroy()
	}
}

Explosion.prototype.setImage = function(){
	this.image = $('<img src = "media/explosion.png">')[0]
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
	var sound = new Audio('media/explosion.mp3')
	sound.volume = Math.min(this.terminalRadius * this.terminalRadius / 2000, 1) * VOLUME / 100
	sound.play()
}


Explosion.MORPH = 2.5
Explosion.INITIALRADIUS = 0
