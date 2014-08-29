var RocketShip = Xpace.RocketShip = function(game){
	AIShip.call(this, game)
}

RocketShip.inherits(AIShip)

RocketShip.prototype.setWeapon = function(){
	var ship = this
<<<<<<< HEAD
	this._weapon = setInterval(function(){
		ship.fireRocket(ship.center())
	}, 5000)
=======
	this._weapon = setInterval(ship.fireRocket.bind(ship), 2000)
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
}

RocketShip.prototype.setImage = function(){
	this.image = {}
<<<<<<< HEAD
	this.image.img = $('<img src = "media/rocketShip.png">')[0]
=======
	this.image.img = $('<img src = "rocketShip.png">')[0]
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
	this.image.height = 77
	this.image.width = 77
	this.radius = 35
	this.dir(this.directionTo(Canvas))
}

RocketShip.prototype.setTargetRange = function(){
	this.targetRange = Math.random() * 200 + 600
}

RocketShip.ROCKETPOWER = 0.2