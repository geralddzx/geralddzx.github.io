var LaserShip = Xpace.LaserShip = function(game, laserType){
	AIShip.call(this, game)
	this.laserType = 2
}

LaserShip.inherits(AIShip)

LaserShip.prototype.setWeapon = function(){
	var ship = this
	this._weapon = setInterval(ship.fireLaser.bind(ship), 5000)
}

LaserShip.prototype.setImage = function(){
	this.image = {}
	this.image.img = $('<img src = "media/laserShip.png">')[0]
	this.image.height = 50
	this.image.width = 50
	this.radius = 21
	this.dir(this.directionTo(Canvas))
}

LaserShip.prototype.setTargetRange = function(){
	this.targetRange = Math.random() * 200 + 200
}

LaserShip.ROCKETPOWER = 0.2