var BulletShip = Xpace.BulletShip = function(game){
	AIShip.call(this, game)
}

BulletShip.inherits(AIShip)

BulletShip.prototype.setWeapon = function(){
	var ship = this
	this._weapon = setInterval(function(){
		ship.fireBullet(ship.left())
		ship.fireBullet(ship.right())
	}, 5000)
}

BulletShip.prototype.setImage = function(){
	this.image = {}
	this.image.img = $('<img src = "media/bulletShip.png">')[0]
	this.image.height = 48
	this.image.width = 48
	this.radius = 20
	this.dir(this.directionTo(Canvas))
}

BulletShip.prototype.setTargetRange = function(){
	this.targetRange = Math.random() * 100 + 50
}