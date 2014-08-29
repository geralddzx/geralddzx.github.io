<<<<<<< HEAD
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
=======
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
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
		this.destroy()
	}
}

Explosion.prototype.setImage = function(){
<<<<<<< HEAD
	this.image = $('<img src = "media/explosion.png">')[0]
=======
	this.image = $('<img src = "explosion.png">')[0]
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
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
<<<<<<< HEAD
	var sound = new Audio('media/explosion.mp3')
	sound.volume = Math.min(this.terminalRadius * this.terminalRadius / 2000, 1) * VOLUME / 100
	sound.play()
}


Explosion.MORPH = 2.5
Explosion.INITIALRADIUS = 0
=======
	var sound = new Audio('explosion.mp3')
	sound.volume = Math.min(this.spread * this.spread / 1000, 1)
	sound.play()
}

// Explosion.SOUND = 

Explosion.MORPH = 2.5
Explosion.MINSIZE = 0
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
