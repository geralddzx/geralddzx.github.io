var AIShip = Xpace.AIShip = function(game){
	Ship.call(this, game)
	this.target = game.playerShip()
	this.setWeapon()
	this.setTargetRange()
}

AIShip.inherits(Ship)

AIShip.prototype.setPriorities = function(){
	var forwardPriority = 0.2
	this._forwardPriority = forwardPriority
	this._avoidancePriority = 1 - forwardPriority
}

AIShip.prototype.destroy = function(){
	clearInterval(this._weapon)
	MovingObject.prototype.destroy.call(this)
}

AIShip.prototype.step = function(){
	this.resetDir()
	this.accelerate()
	this.move()
}

AIShip.prototype.obsDirection = function(){
	var total = [0, 0]
	var ship = this
<<<<<<< HEAD
	this.game.objects.forEach(function(object){
		if (ship.checkHostility(object) && ship.withinRange(object)){
			var displacement = subtractVectors(object.position(), ship.position())
			var distance = ship.distanceTo(object)
=======
	this.game.entities().forEach(function(entity){
		if (ship.checkHostility(entity) && ship.withinRange(entity)){
			var displacement = subtractVectors(entity.pos, ship.pos)
			var distance = ship.distanceTo(entity)
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
			var distanceFactor = 1 / (distance * distance)
			var contribution = timesVector(distanceFactor, unitVector(displacement))
			total = addVectors(total, contribution)
		}
	})
	return genDirection(total)
}

AIShip.prototype.resetDir = function(){
	if (this.target){
		this.dir(this.directionTo(this.target))
	}
}

AIShip.prototype.accelerate = function(){
	this.accelerateForward(0.05)
	this.accelerateFromObstacles(0.1)
	this.speedControl(3)
}

AIShip.prototype.accelerateFromObstacles = function(power){
	var targetDir = this.obsDirection() + Math.PI
	if (targetDir){
		dVel = genVector(power, targetDir)
		this.vel = addVectors(this.vel, dVel)
	}
}

AIShip.prototype.accelerateForward = function(power){
	if (this.target && this.withinTargetRange()){
		power = -0.05
	}
	var dVel = genVector(power, this.dir())
	this.vel = addVectors(this.vel, dVel)
}

AIShip.prototype.withinRange = function(target){
	return this.distanceTo(target) < AIShip.RANGE
}

AIShip.prototype.withinTargetRange = function(){
	return this.distanceTo(this.target) < this.targetRange
}

// AIShip.ACCELERATION = 20
<<<<<<< HEAD
AIShip.RANGE = 200
=======
AIShip.RANGE = 200
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
