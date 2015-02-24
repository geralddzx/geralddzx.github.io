var PlayerShip = Xpace.PlayerShip = function(game){
	Ship.call(this, game)
	this.pos = Canvas.center()
	this.dir(Math.PI / 2)
	this.bindKeys()
	this.laserType = 2
}

PlayerShip.inherits(Ship)

PlayerShip.prototype.setImage = function(){
	this.image = {}
	this.image.img = PlayerShip.IMAGE
	this.image.height = 58
	this.image.width = 58
	this.radius = 26
}

PlayerShip.prototype.move = function(){
	MovingObject.prototype.move.call(this)
	this.wrapX()
	this.wrapY()
}

PlayerShip.prototype.inView = function(){
	return true
}

PlayerShip.prototype.bindKeys = function(){
	var ship = this
	Object.keys(PlayerShip.MOVES).forEach(function(moveKey){
		key(moveKey, ship.impulse.bind(ship, PlayerShip.POWER, PlayerShip.MOVES[moveKey]))
	})
	Object.keys(PlayerShip.TURNS).forEach(function(turnKey){
		key(turnKey, ship.turn.bind(ship, PlayerShip.TURNS[turnKey]))
	})
	Object.keys(PlayerShip.SHIFTS).forEach(function(shiftKey){
		key(shiftKey, function(){
			event.preventDefault()
			ship.shift(PlayerShip.SHIFTS[shiftKey])
		})
	})
	key("z", function(){
		if(!ship.lastBullet || (Date.now() - ship.lastBullet) > 300){
			ship.fireBullet(ship.left())
			ship.fireBullet(ship.right())
			ship.lastBullet = Date.now()
		}
	})

	key("x", function(){
		if(!ship.lastRocket || (Date.now() - ship.lastRocket) > 300){
			ship.fireRocket(ship.center())
			ship.lastRocket = Date.now()
		}	
	})
	key("c", function(){
		ship.fireLaser()
	})
}

PlayerShip.prototype.unbindKeys = function(){
	Object.keys(PlayerShip.MOVES).forEach(function(moveKey){
		key.unbind(moveKey)
	})
	Object.keys(PlayerShip.TURNS).forEach(function(turnKey){
		key.unbind(turnKey)
	})
	Object.keys(PlayerShip.SHIFTS).forEach(function(shiftKey){
		key.unbind(shiftKey)
	})
	key.unbind("z")
	key.unbind("x")
}

PlayerShip.prototype.impulse = function(mag, dir){
	dir = this.dir() + dir
	var impulse = genVector(mag, dir)
	var terminalVel = addVectors(this.vel, impulse)

	if (magnitude(terminalVel) <= PlayerShip.MAXSPEED){
		this.vel = terminalVel
	}
}

PlayerShip.prototype.shift = function(dir){
	this.vel = genVector(PlayerShip.SHIFTPOWER, dir)
}

PlayerShip.prototype.destroy = function(){
	// this.game = null
	// this.unbindKeys()
}

PlayerShip.ACCELERATION = 0.3

PlayerShip.MOVES = {
	w: 0,
	a: Math.PI / 2,
	s: Math.PI,
	d: Math.PI * 3 / 2
}

PlayerShip.SHIFTS = {
	right: 0,
	up: Math.PI / 2,
	left: Math.PI,
	down: Math.PI * 3 / 2
}

PlayerShip.TURNS = {
	q: 1/100,
	e: -1/100
}

PlayerShip.IMAGE = $('<img>')[0]
PlayerShip.POWER = 1
PlayerShip.SHIFTPOWER = 2
PlayerShip.ROCKETPOWER = 1
PlayerShip.MAXSPEED = 5