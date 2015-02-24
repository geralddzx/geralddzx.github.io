var MotherShip = Xpace.MotherShip = function(game, pos){
	AIShip.call(this, game)
	game.motherShip = this
	this.life(5000)
	this.pos = pos
}

MotherShip.inherits(AIShip)

MotherShip.prototype.initializeAmmo = function(){
	Ship.prototype.initializeAmmo.call(this)
	this.bullets = 0
	this.rockets = 0
	this.replenish()
}

MotherShip.prototype.replenish = function(){
	var ship = this
	this._replenish = setInterval(function(){
		if (ship.inView()){
			ship.bullets += 10
			ship.rockets += 2
		}
	}, 5000)
}

MotherShip.prototype.rocketPos = function(){
	var leftPos = this.left()
	var rightDir = quadAngle(this.dir() - Math.PI / 2)
	var disFromLeft = genVector(this.corePos() / this.divisionLines * this.radius * 2, rightDir)
	return addVectors(leftPos, disFromLeft) 
}

MotherShip.prototype.corePos = function(){
	if (!this._corePos){
		this._corePos = 0
	}
	this._corePos += 1
	if (this._corePos === this.divisionLines){
		this._corePos = 1
	}
	return this._corePos
}

MotherShip.prototype.destroy = function(){
	clearInterval(this._replenish)
	clearInterval(this._guns)
	clearInterval(this._launchers)
	clearInterval(this._cannons)
	this.game.motherShip = null
	MovingObject.prototype.destroy.call(this)
}

MotherShip.prototype.setWeapon = function(){
	this.initializeAmmo()
	this.setGuns()
	this.setLaunchers()
	this.setCannons()
}

MotherShip.prototype.setLaunchers = function(){
	this.divisionLines = 5
	var ship = this
	this._launchers = setInterval(function(){
		if (ship.inView()){
			ship.fireRocket(ship.rocketPos())
		}
	}, 100)
}

MotherShip.prototype.setGuns = function(){
	var ship = this
	this._guns = setInterval(function(){
		if (ship.inView()){
			ship.fireBullet(ship.center())
		}
	}, 200)
}

MotherShip.prototype.setCannons = function(){
	var ship = this
	this._cannons = setInterval(function(){
		if (ship.inView()){
			Laser.RADIUS = 2
			ship.fireLaser()
			Laser.RADIUS = 1
		}
	}, 5000)
}

MotherShip.prototype.setImage = function(){
	this.image = {}
	this.image.img = $('<img src = "media/motherShip.png">')[0]
	this.image.height = 191
	this.image.width = 167
	this.radius = 70
	this.dir(this.directionTo(Canvas))
}

MotherShip.prototype.setTargetRange = function(){
	this.targetRange = 350
}

MotherShip.prototype.accelerate = function(){
	this.accelerateForward(0.01)
	this.accelerateFromObstacles(0)
	this.speedControl(1)
}

MotherShip.ROCKETPOWER = 0.2