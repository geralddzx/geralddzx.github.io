Rock = Xpace.Rock = function(game){
	this.radius = Rock.randomRad()
	MovingObject.call(this, game)
	this.asteroid = new Asteroid(game, this, this.randomVel())
}

Rock.inherits(MovingObject)

Rock.prototype.randomVel = function(){
	var dir = this.innerDirection()
	dir = randBetween(dir - Math.PI / 4, dir + Math.PI / 4)
	mag = Math.random() * Game.SPEED / 2 + Game.SPEED * 2
	return genVector(mag, dir)
}

Rock.prototype.move = function(){
	this.pos[0] += this.asteroid.vel[0]
	this.pos[1] += this.asteroid.vel[1]
}

Rock.randomRad = function(){
	return Math.random() * Rock.RADIUS
}

Rock.randomPos = function(){
	position = []
	position[0] = Math.random() * canvas.width
	position[1] = - Math.random() * canvas.height
	return position
}

Rock.prototype.setImage = function(){
	this.image = {}
	var imgNum = Math.floor(Math.random()*3) + 1

	this.image.img = $('<img src = "media/asteroid' + imgNum + '.png">')[0]
	this.image.height = this.radius * 2.25
	this.image.width = this.radius * 2.25
	this.dir(0)
}

// Rock.prototype._drawImage = function(){
// 	var width = this.image.width
// 	var height = this.image.height
// 	ctx.drawImage(this.image.img, - width / 2, - height / 2, width, height)
// }

Rock.prototype.step = function(){}

Rock.prototype.draw = function(){
	var width = this.image.width
	var height = this.image.height
	ctx.drawImage(this.image.img, this.pos[0] - width / 2, this.pos[1] - height / 2, width, height)
}

Rock.RADIUS = 25