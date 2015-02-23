var MovingObject = Xpace.MovingObject = function(game){
	this.game = game
	this.pos = Canvas.randomSpawnPos()
	this.setImage()
	this.torque = 0
	this.acceleration = this.constructor.ACCELERATION
}

MovingObject.prototype.turnTowards = function(target){
	var targetDisplacement = subtractVectors(target.pos, this.pos)
	var targetDirection = genDirection(targetDisplacement)
	targetDirection = quadAngle(targetDirection)
	var turnAngle = targetDirection - this.dir()
	var turnDir = turnAngle / Math.abs(turnAngle)
	if (Math.abs(turnAngle) > Math.PI) {
		turnDir = turnDir * -1	
	}
	this.turn(turnDir)
}

MovingObject.prototype.turn = function(torq){
	this.torque += torq
}

MovingObject.prototype.step = function(){
	this.move()
}

MovingObject.prototype.move = function(){
	this.pos[0] += this.vel[0]
	this.pos[1] += this.vel[1]
	if (this.torque){
		this.dir(this.dir() + this.torque)
	}
}

MovingObject.prototype.destroy = function(){
	if (this.game && this.inView() && this.mass()){
		this.game.entities.push(new Explosion(this))
	}
	this.game = null
}

MovingObject.prototype.wrapX = function(){
	if (this.pos[0] < 0 - this.radius){
		this.pos[0] = canvas.width + this.radius
	} else if (this.pos[0] > canvas.width + this.radius){
		this.pos[0] = 0 - this.radius
	}
}

MovingObject.prototype.wrapY = function(){
	if (this.pos[1] < 0 - this.radius){
		this.pos[1] = canvas.height + this.radius
	} else if (this.pos[1] > canvas.height + this.radius){
		this.pos[1] = 0 - this.radius
	}
}

MovingObject.prototype.checkCollision = function(object){
	if (this.checkHostility(object)){
		if (object.rocks){
			return this.touchAny(object.rocks)
		} else {
			return this.touch(object)
		}
	} else {
		return false
	}
} 

MovingObject.prototype.touch = function(object){
	var friction = Math.min(this.radius, object.radius) / 2
	return distance(this.pos, object.pos) < this.radius + object.radius - friction
}

MovingObject.prototype.touchAny = function(objects){
	for (var i = 0; i < objects.length; i++){
		if (this.touch(objects[i])){
			return true
		}
	}
	return false
}

MovingObject.prototype.collide = function(object){
	this.reduceLife(100)
	object.reduceLife(100)
}

MovingObject.prototype.inBound = function(){
	return Canvas.inBound(this.pos)
}

MovingObject.prototype.inView = function(){
	return Canvas.inView(this.innerPoint())
}

MovingObject.prototype.innerDirection = function(){
	return genDirection(subtractVectors(Canvas.center(), this.pos))
}

MovingObject.prototype.innerPoint = function(center){
	return addVectors(this.pos, genVector(this.radius, this.innerDirection()))
}

MovingObject.prototype.directionTo = function(object){
	var diff = subtractVectors(object.position(), this.position())
	return genDirection(diff)
}

MovingObject.prototype.distanceTo = function(object){
	return distance(this.position(), object.position())
}	

MovingObject.prototype.tip = function(){
	var vectorFromPos = genVector(this.radius, this.dir())
	return addVectors(this.pos, vectorFromPos)
}

MovingObject.prototype.center = function(){
	return [this.pos[0], this.pos[1]]
}

MovingObject.prototype.left = function(){
	var vectorFromPos = genVector(this.radius, this.dir() + Math.PI / 2)
	return addVectors(this.pos, vectorFromPos)
}

MovingObject.prototype.right = function(){
	var vectorFromPos = genVector(this.radius, this.dir() - Math.PI / 2)
	return addVectors(this.pos, vectorFromPos)
}

MovingObject.prototype.draw = function(){
	ctx.translate(this.pos[0], this.pos[1])
	ctx.rotate(- this.dir())
	this._drawImage()
	ctx.rotate(this.dir())
	ctx.translate(- this.pos[0], - this.pos[1])
}

MovingObject.prototype._drawImage = function(){
	ctx.drawImage(this.image.img, - this.image.width / 2, - this.image.height / 2)
}

MovingObject.prototype.dir = function(dir){
	if (dir){
		this._dir = quadAngle(dir)
	}
	return this._dir
}

MovingObject.prototype.mass = function(){
	return this.radius * this.radius
}

MovingObject.prototype.momentum = function(){
	return timesVector(this.mass(), this.vel)
}

MovingObject.prototype.accelerate = function(){
	var dVel = genVector(this.acceleration, this.dir())
	this.vel = addVectors(this.vel, dVel)
}

MovingObject.prototype.checkHostility = function(object){
	if (object != this && object.ship != this && this.ship != object){
		if (this.ship && object.ship){
			return object.ship != this.ship 
		}
		return true
	}	
	return false
} 

MovingObject.prototype.speedControl = function(speed){
	if (magnitude(this.vel) > speed){
		this.vel = genVector(speed, genDirection(this.vel))
	}
}

MovingObject.prototype.explosionRadius = function(){
	return this.radius
}

MovingObject.prototype.position = function(){
	return this.pos
}

MovingObject.prototype.reduceLife = function(life){
	this.life(this.life() - life)
	if (this.life() <= 0){
		this.destroy()
	}
}

MovingObject.prototype.life = function(life){
	if (life || life === 0){
		this._life = life
	} 
	if (this._life === 0){
		return 0
	}
	return this._life || 100
}