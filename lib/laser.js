var Laser = Xpace.Laser = function(ship){
	this.pos = ship.pos
	this.dir(ship.dir())
	this.ship = ship
	this.game = ship.game
	this.setImage()
	this.playSound()
}

Laser.inherits(MovingObject)

Laser.prototype.setImage = function(){
	this.image = $('<img src = "media/laser' + this.ship.laserType + '.png">')[0]
}

Laser.prototype.step = function(){
	this.span(Canvas.diagonal())
	this.dir(this.ship.dir())
	this.reduceLife(5)
}

Laser.prototype.span = function(length){
	if (length){
		this._span = length
	} 
	return (this._span || Canvas.diagonal())
}

Laser.prototype._drawImage = function(){
	ctx.imageSmoothingEnabled = true
	ctx.drawImage(this.image, 0, - Laser.RADIUS, this.span(), Laser.RADIUS * 2)
}

// Laser.prototype.draw = function(){
// 	ctx.beginPath();
//     ctx.moveTo(this.pos[0], this.pos[1])
//     var endPoint = addVectors(this.pos, genVector(this.span(), this.dir()))
//     ctx.lineTo(endPoint[0], endPoint[1])
//     ctx.strokeStyle = '#ff0000'
//     ctx.stroke()
// }

Laser.prototype.closestObject = function(){
	var laser = this
	var closest = null
	this.game.objects.forEach(function(object){
		if (laser.checkHit(object)){
			if (!closest){
				closest = object
			} else if (laser.distanceTo(object) < laser.distanceTo(closest)){
				closest = object				
			}
		}
	})
	return closest
}

Laser.prototype.hitClosest = function(){
	var closest = this.closestObject()
	if (closest){
		this.span(this.distanceTo(closest))
		closest.reduceLife(20)
	}
}			

Laser.prototype.touch = function(object){
	if (object != this.ship){
		var direction = this.directionTo(object)
		var perpDir = direction + Math.PI / 2
		var perpDis = genVector(object.radius, perpDir)
		var perpPoint = addVectors(object.pos, perpDis)
		var edgeDir = genDirection(subtractVectors(perpPoint, this.pos))
		return angleBetweenDirs(this.dir(), direction) < angleBetweenDirs(direction, edgeDir)
	}
}

Laser.prototype.checkHit = function(object){
	if (object.rocks){
		for (var i = 0; i < object.rocks.length; i++) {
			if (this.touch(object.rocks[i])){
				return true
			}
		}
		return false
	} else {
		return this.touch(object)
	}

}

Laser.prototype.destroy = function(){
	this.game = null
	this.ship.lasers = 0
	this.ship = null
}

Laser.prototype.playSound = function(){
	var sound = new Audio('media/laser.mp3')
	sound.volume = 0.1 * VOLUME / 100
	sound.play()
}

Laser.RADIUS = 1
