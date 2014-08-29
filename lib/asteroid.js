Asteroid = Xpace.Asteroid = function(game, rock, vel){
	this.game = game
	this.vel = vel
	this.rocks = [rock]
}

Asteroid.inherits(MovingObject)

Asteroid.prototype.move = function(){
	this.rocks.forEach(function(rock){
		rock.move()
	})
}

Asteroid.prototype.destroy = function(){
<<<<<<< HEAD
	MovingObject.prototype.destroy.call(this)	
	this.rocks.forEach(function(rock){
		rock.destroy()
	})
=======
	if (this.game && this.mass() && this.inView()){
		this.radius = Math.sqrt(this.mass())
		this.pos = this.centerOfGravity()
		this.game.createExplosion(this)
		this.rocks.forEach(function(rock){
			// rock.game = null
			rock.destroy()
		})
	}
	this.game = null
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
}

Asteroid.prototype.inBound = function(){
	for (var i = 0; i < this.rocks.length; i++) {
		if (this.rocks[i].inBound()){
			return true
		}
	}
	return false
}

Asteroid.prototype.inView = function(){
	for (var i = 0; i < this.rocks.length; i++) {
		if (this.rocks[i].inView()){
			return true
		}
	}
	return false
}

Asteroid.prototype.checkCollision = function(object){
	for (var i = 0; i < this.rocks.length; i++){
		if (this.rocks[i].checkCollision(object)){
			return true
		}
	}
	return false
}

Asteroid.prototype.collide = function(object){
	if (object.rocks && this.game && object.game){
		this.merge(object)
	} else {
		this.destroy()
		object.destroy()
	}
}

Asteroid.prototype.merge = function(asteroid){
	totalMomentum = addVectors(this.momentum(), asteroid.momentum())
	asteroid.vel = timesVector(1 / (this.mass() + asteroid.mass()), totalMomentum)
	this.rocks.forEach(function(rock){
		rock.asteroid = asteroid
	})
	asteroid.rocks = this.rocks.concat(asteroid.rocks)
	if (asteroid.inView()){
		asteroid.playMergeSound()
	}
	this.rocks = []
	this.destroy()
}

<<<<<<< HEAD
Asteroid.prototype.position = function(){
=======
Asteroid.prototype.centerOfGravity = function(){
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
	var massPos = [0, 0]
	this.rocks.forEach(function(rock){
		var rockMassPos = timesVector(rock.mass(), rock.pos)
		massPos = addVectors(massPos, rockMassPos)
	})
	return timesVector(1 / this.mass(), massPos)
}

<<<<<<< HEAD
Asteroid.prototype.explosionRadius = function(){
	return Math.sqrt(this.mass())
}

=======
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
Asteroid.prototype.mass = function(){
	var totalMass = 0
	this.rocks.forEach(function(rock){
		totalMass += rock.mass()
	})
	return totalMass
}

Asteroid.prototype.draw = function(){
	// this.rocks.forEach(function(rock){
	// 	rock.draw()
	// })
}

Asteroid.prototype.playMergeSound = function(){
<<<<<<< HEAD
	var sound = new Audio("media/merge.mp3")
	var mass = this.mass()
	sound.volume = Math.min(1, mass * mass / 2000000) * VOLUME / 100
	sound.play()
}

Asteroid.prototype.draw = function(){}

=======
	var sound = new Audio("merge.mp3")
	var mass = this.mass()
	sound.volume = Math.min(1, mass * mass / 2000000)
	sound.play()
}

>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
Asteroid.COLOR = "yellow"
Asteroid.RADIUS = 10

