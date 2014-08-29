var Ship = Xpace.Ship = function(game){
	this.markedTargets = []
<<<<<<< HEAD
	this.vel = [0, 0]
	this.initializeAmmo()
=======
	this.torque = Ship.TORQUE
	this.vel = [0, 0]
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
	MovingObject.call(this, game)
}

Ship.inherits(MovingObject)

<<<<<<< HEAD
Ship.prototype.initializeAmmo = function(){
	this.bullets = Infinity
	this.lasers = 0
	this.rockets = Infinity
	this.laserType = 2
}

Ship.prototype.fireBullet = function(launchPos){
	if (this.bullets > 0 && this.inView()){
		this.game.objects.push(new Xpace.Bullet(this, launchPos))
		this.bullets -= 1
	}
}

Ship.prototype.fireRocket = function(launchPos){
	if (this.rockets > 0 && this.inView()){
		this.game.objects.push(new Xpace.Rocket(this, launchPos))
		this.rockets -= 1
	}
}

Ship.prototype.fireLaser = function(){
	if (this.lasers == 0 && this.inView()){
		this.game.lasers.push(new Xpace.Laser(this))
		this.lasers = 1
	}
=======
Ship.prototype.move = function(){
	MovingObject.prototype.move.call(this)
	this.wrapX()
	this.wrapY()
}

Ship.prototype.fireBullet = function(){
	this.game.objects.push(new Xpace.Bullet(this, this.right()))
	this.game.objects.push(new Xpace.Bullet(this, this.left()))
}

Ship.prototype.fireRocket = function(){
	this.game.objects.push(new Xpace.Rocket(this, this.center()))
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
}

Ship.prototype.left = function(){
	var vectorFromPos = genVector(this.radius, this.dir() + Math.PI / 2)
	vectorFromPos = timesVector(0.7, vectorFromPos)
	return addVectors(this.pos, vectorFromPos)
}

Ship.prototype.right = function(){
	var vectorFromPos = genVector(this.radius, this.dir() - Math.PI / 2)
	vectorFromPos = timesVector(0.7, vectorFromPos)
	return addVectors(this.pos, vectorFromPos)
}

<<<<<<< HEAD
=======
Ship.prototype.collide = function(object){
	if (object.ship != this){
		this.destroy()
		object.destroy()
	}
}

>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
Ship.prototype.markTarget = function(target){
	if (target && this.markedTargets.indexOf(target == -1)){
		this.markedTargets.push(target)
	}
}

Ship.prototype.removeTarget = function(target){
	var targetIndex = this.markedTargets.indexOf(target)
	if (targetIndex != -1){
		this.markedTargets.splice(targetIndex, 1)
	}
}

Ship.prototype.marked = function(object){
<<<<<<< HEAD
	return this.markedTargets.indexOf(object) != -1
=======
	return this.markedTargets.indexOf(object != -1)
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
}

Ship.prototype.draw = function(){
	MovingObject.prototype.draw.call(this)
	$("#targets").html("Marked Targets: " + this.markedTargets.length)
	$("#rocket-counter").html("Rockets: " + this.game.rockets().length)
}

Ship.TORQUE = Math.PI / 100


