var BulletShip = Xpace.BulletShip = function(game){
	AIShip.call(this, game)
}

BulletShip.inherits(AIShip)

BulletShip.prototype.setWeapon = function(){
	var ship = this
<<<<<<< HEAD
	this._weapon = setInterval(function(){
		ship.fireBullet(ship.left())
		ship.fireBullet(ship.right())
	}, 5000)
=======
	this._weapon = setInterval(ship.fireBullet.bind(ship), 2000)
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
}

BulletShip.prototype.setImage = function(){
	this.image = {}
<<<<<<< HEAD
	this.image.img = $('<img src = "media/bulletShip.png">')[0]
=======
	this.image.img = $('<img src = "bulletShip.png">')[0]
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
	this.image.height = 48
	this.image.width = 48
	this.radius = 20
	this.dir(this.directionTo(Canvas))
}

BulletShip.prototype.setTargetRange = function(){
	this.targetRange = Math.random() * 200 + 100
}