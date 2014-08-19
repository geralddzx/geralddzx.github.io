var Ship = Xpace.Ship = function(game){
	this.markedTargets = []
	this.torque = Ship.TORQUE
	this.vel = [0, 0]
	MovingObject.call(this, game)
}

Ship.inherits(MovingObject)

Ship.prototype.move = function(){
	MovingObject.prototype.move.call(this)
	this.wrapX()
	this.wrapY()
}

Ship.prototype.fireBullet = function(){
	this.game.objects.push(new Xpace.Bullet(this, this.right()))
	this.game.objects.push(new Xpace.Bullet(this, this.left()))
}

Ship.prototype.fireRocket = function(){
	this.game.objects.push(new Xpace.Rocket(this, this.center()))
}

Ship.prototype.left = function(){
	var vectorFromPos = genVector(this.radius, this.dir() + Math.PI / 2)
	vectorFromPos = timesVector(0.7, vectorFromPos)
	return addVectors(this.pos, vectorFromPos)
}

Ship.prototype.right = function(){
	var vectorFromPos = genVector(this.radius, this.dir() - Math.PI / 2)
	vectorFromPos = timesVector(0.7, vectorFromPos)
	return addVectors(this.pos, vectorFromPos)
}

Ship.prototype.collide = function(object){
	if (object.ship != this){
		this.destroy()
		object.destroy()
	}
}

Ship.prototype.markTarget = function(target){
	if (target && this.markedTargets.indexOf(target == -1)){
		this.markedTargets.push(target)
	}
}

Ship.prototype.removeTarget = function(target){
	var targetIndex = this.markedTargets.indexOf(target)
	if (targetIndex != -1){
		this.markedTargets.splice(targetIndex, 1)
	}
}

Ship.prototype.marked = function(object){
	return this.markedTargets.indexOf(object != -1)
}

Ship.prototype.draw = function(){
	MovingObject.prototype.draw.call(this)
	$("#targets").html("Marked Targets: " + this.markedTargets.length)
	$("#rocket-counter").html("Rockets: " + this.game.rockets().length)
}

Ship.TORQUE = Math.PI / 100


