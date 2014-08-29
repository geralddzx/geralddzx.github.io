Rocket = Xpace.Rocket = function(ship, launchPos){
	MovingObject.call(this, ship.game)
	this.ship = ship
	this.pos = launchPos
	this.radius = Rocket.RADIUS

	this.playSound()
	this.setVel()
	this.torque = Rocket.TORQUE
<<<<<<< HEAD
	this.target(this.ship.target)
=======
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
}

Rocket.inherits(MovingObject)

Rocket.prototype.step = function(){
	this.resetTarget()
	this.accelerate()
	this.move()
}

Rocket.prototype.setVel = function(){
	rocketVel = genVector(Rocket.SPEED, this.ship.dir())
	this.vel = addVectors(this.ship.vel, rocketVel)
	// this.vel = [0, 0]
}

Rocket.prototype.accelerate = function(){
	// var direction = genDirection(this.vel)
	if (this.target() && !this.targetWithinFocus()){
		this.adjustDir()
		// var targetDisplacement = subtractVectors(this.target().pos, this.pos)
		// var diffVel = subtractVectors(targetDisplacement, this.vel)
		// direction = genDirection(diffVel)
		// var direction = this.directionTo(target)
	} else {
		// direction = this.dir()
		this.forward()
	}
	// this.dir(direction)
	// var dVel = genVector(this.ship.constructor.ROCKETPOWER, direction)
	// this.vel = addVectors(this.vel, dVel)
}

Rocket.prototype.forward = function(){
	var dVel = genVector(this.acceleration, this.dir())
	this.vel = addVectors(this.vel, dVel)
}

Rocket.prototype.dir = function(){
	return genDirection(this.vel) 
}

Rocket.prototype.targetWithinFocus = function(){
	var targetDir = this.directionTo(this.target())
	var currentDir = genDirection(this.vel)
<<<<<<< HEAD
	return angleBetweenDirs(targetDir, currentDir) < Rocket.FOCUSRANGE
=======
	var absDiff = Math.abs(targetDir - currentDir)
	return Math.min(absDiff, Math.PI * 2 - absDiff) < Rocket.FOCUSRANGE
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
}

Rocket.prototype.adjustDir = function(){
	var speed = magnitude(this.vel) 
	var targetDir = this.directionTo(this.target())
	var targetVel = genVector(speed, targetDir)
	var diffVel = subtractVectors(targetVel, this.vel)
<<<<<<< HEAD
	if (magnitude(diffVel) > this.acceleration){
		var acceleration = genVector(this.acceleration, genDirection(diffVel))
	} else {
		var acceleration = diffVel
	}
=======
	var acceleration = genVector(this.acceleration, genDirection(diffVel))
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
	this.vel = addVectors(this.vel, acceleration)
}

Rocket.prototype.resetTarget = function(){
<<<<<<< HEAD
	if (this.ship.constructor == PlayerShip && this.game.motherShip()){
		this.target(this.game.motherShip())
	}

	if (this.ship.target){
		return 
	} else if (!this.target()){
		this.target(this.closestTarget())
	} else if (!this.target().game || !this.target().inView()){
		this.target(this.closestTarget())
	}
}

Rocket.prototype.closestTarget = function(){
	var targets = this.genTargets()
	var closestTarget = targets[0]
	var rocket = this
	for (var i = 0; i < targets.length; i++){
		if (distance(targets[i].position(), rocket.pos) < distance(closestTarget.position(), rocket.pos)){
=======
	if (this.ship.target){
		this.target(this.ship.target)
	} else if (!this.target()){
		this.target(this.getTarget())
	} else if (!this.target().game || !this.target().inView()){
		this.ship.removeTarget(this.target())
		this.target(this.getTarget())
	}
}

Rocket.prototype.getTarget = function(){
	var targets = this.availableTargets()
	var closestTarget = targets[0]
	var rocket = this
	for (var i = 0; i < targets.length; i++) {
		if (targets[i].setWeapon){
			return targets[i]
		} else if (distance(targets[i].pos, rocket.pos) < distance(closestTarget.pos, rocket.pos)){
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
			closestTarget = targets[i]
		}
	}
	return closestTarget
}

<<<<<<< HEAD
Rocket.prototype.genTargets = function(){
	var targets = []
	for (var i = 0; i < this.game.objects.length; i++){
		var object = this.game.objects[i]
		if  (this.validTarget(object) && !this.ship.marked(object)){
			if (object.setWeapon){
				return [object]
			} else {
				targets.push(object)
			}
		}
	}
	return targets
}

Rocket.prototype.validTarget = function(object){
	return object.game && object.inView() && this.checkHostility(object)
}

Rocket.prototype.target = function(target){
	if (target){
		this.ship.removeTarget(this._target)
=======
Rocket.prototype.availableTargets = function(){
	var targets = []
	var rocket = this
	this.game.entities().forEach(function(entity){
		if (entity.game && entity.inView() && rocket.checkHostility(entity)){
			if (rocket.ship.markedTargets.indexOf(entity) == -1){
				targets.push(entity)
			}
		}
	})
	return targets
}

Rocket.prototype.target = function(target){
	if (target){
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
		this._target = target
		this.ship.markTarget(target)
	}
	return this._target
}

Rocket.prototype.setImage = function(){
	this.image = {}
<<<<<<< HEAD
	this.image.img = $('<img src = "media/rocket.png">')[0]
=======
	this.image.img = $('<img src = "rocket.png">')[0]
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
	this.image.height = 20
	this.image.width = 20
}

Rocket.prototype.collide = function(object){
	if (object.ship != this.ship){
		this.destroy()
		object.destroy()
	}
}

Rocket.prototype.destroy = function(){
	MovingObject.prototype.destroy.call(this)
	this.ship.removeTarget(this.target())
}

Rocket.prototype.inBound = function(){
	return this.inView()
}

Rocket.prototype.explosionRadius = function(){
	return this.radius * 5
}

Rocket.prototype.playSound = function(){
<<<<<<< HEAD
	var sound = new Audio("media/rocket.mp3")
	sound.volume = 1 / 20 * VOLUME / 100
=======
	var sound = new Audio("rocket.mp3")
	sound.volume = 1 / 10
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
	sound.play()
}

Rocket.FOCUSRANGE = 0.15
Rocket.TORQUE = Math.PI / 20
Rocket.RADIUS = 3
Rocket.ACCELERATION = 0.2
<<<<<<< HEAD
Rocket.SPEED = 0.1
=======
Rocket.SPEED = 0.2
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7

