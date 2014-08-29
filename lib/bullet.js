Bullet = Xpace.Bullet = function(ship, launchPos){	
	MovingObject.call(this, ship.game)
	this.ship = ship
	this.pos = launchPos

	this.radius = Bullet.RADIUS
	this.dir(ship.dir())
	this.playSound()
	this.setVel()
}

Bullet.inherits(MovingObject)

Bullet.prototype.setVel = function(){
	var bulletVel = genVector(Bullet.SPEED, this.ship.dir())
	this.vel = addVectors(this.ship.vel, bulletVel)
}

Bullet.prototype.setImage = function(){
	this.image = {}
	this.image.img = Bullet.IMAGE
	this.image.height = 13
	this.image.width = 13
}

Bullet.prototype.collide = function(object){
	if (object.ship != this.ship){
		this.destroy()
		object.destroy()
	}
}

Bullet.prototype.explosionRadius = function(){
	return this.radius * 5
}

Bullet.prototype.playSound = function(){
<<<<<<< HEAD
	var sound = new Audio("media/bullet.mp3")
	sound.volume = 1 / 5 * VOLUME / 100
	sound.play()
}

Bullet.IMAGE = $('<img src = "media/bullet.png">')[0]
=======
	var sound = new Audio("bullet.mp3")
	sound.volume = 1 / 3
	sound.play()
}

Bullet.IMAGE = $('<img src = "bullet.png">')[0]
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
Bullet.SPEED = 10
Bullet.RADIUS = 2