var RocketShip = Xpace.RocketShip = function(game){
	AIShip.call(this, game)
}

RocketShip.inherits(AIShip)

RocketShip.prototype.setWeapon = function(){
	var ship = this
	this._weapon = setInterval(function(){
		ship.fireRocket(ship.center())
	}, 5000)
}

RocketShip.prototype.setImage = function(){
	this.image = {}
	this.image.img = $('<img src = "media/rocketShip.png">')[0]
	this.image.height = 77
	this.image.width = 77
	this.radius = 35
	this.dir(this.directionTo(Canvas))
}

RocketShip.prototype.setTargetRange = function(){
	this.targetRange = Math.random() * 200 + 600
}

RocketShip.ROCKETPOWER = 0.2