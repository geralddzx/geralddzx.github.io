var Game = Xpace.Game = function(num){
	this.objects = []
	this.lasers = []
	this.entities = []
	this.start()
	this.playMusic()
}

Game.SPEED = 1

Game.prototype.spawnShips = function(){
	var game = this

	this.add(new PlayerShip(this))
	this.add(new MotherShip(this, Canvas.east()))

	setInterval(function(){
		game.add(new BulletShip(game))
	}, 3000)
	setInterval(function(){
		game.add(new RocketShip(game))
	}, 3000)
	setInterval(function(){
		game.add(new LaserShip(game))
	}, 6000)
}

Game.prototype.spawnRocks = function(int){
	var game = this
	setInterval(function(){
		if (game.entities.length < 1000){
			var rock = new Rock(game)
			game.entities.push(rock)
			game.objects.push(rock.asteroid)
		}
	}, 200)
}

Game.prototype.start = function(){
	game = this
	setInterval(function(){
		game.step()
		game.checkCollisions()
		game.checkLaserCollisions()
		game.checkInBound()
		game.resetMatters()
		game.draw()
	}, 15)
	this.spawnShips()
	this.spawnRocks()
}

Game.prototype.step = function(){
	this.matters().forEach(function(matter){
		if (matter.game){
			matter.step()
		}
	})
}

Game.prototype.checkInBound = function(){
	this.objects.forEach(function(object){
		if (object.game && !object.inBound()){
			object.destroy()
		}
	})
}

Game.prototype.checkCollisions = function(){
	var length = this.objects.length
	for(var i = 0; i < length; i++){
		for(var j = i + 1; j < length; j++){
			if (this.objects[i].checkCollision(this.objects[j])){
				this.objects[i].collide(this.objects[j])
			}
		}
	}
}

Game.prototype.checkLaserCollisions = function(){
	this.lasers.forEach(function(laser){
		if (laser.span && laser.game){
			laser.hitClosest()
		}
	})
}

Game.prototype.resetMatters = function(){
	this.resetEntities()
	this.resetLasers()
	this.resetObjects()
}

Game.prototype.resetObjects = function(){
	var objects = []
	var game = this
	this.objects.forEach(function(object){
		if (object.game == game){
			objects.push(object)
		}
	})
	this.objects = objects
}

Game.prototype.resetLasers = function(){
	var lasers = []
	var game = this
	this.lasers.forEach(function(laser){
		if (laser.game == game){
			lasers.push(laser)
		}
	})
	this.lasers = lasers
}

Game.prototype.resetEntities = function(){
	var entities = []
	var game = this
	this.entities.forEach(function(entity){
		if (entity.game == game){
			entities.push(entity)
		}
	})
	this.entities = entities
}

Game.prototype.draw = function(){
	ctx.drawImage(background, 0, 0)
	this.matters().forEach(function(matter){
		matter.draw()
	})
	$("#counter").html("Objects:" + this.matters().length)
	// $("#rock-counter").html("rocks:" + this.rocks.length)
	// $("#ship-counter").html("ships:" + this.ships().length)
	// $("#explosion-counter").html("explosions:" + this.explosions.length)
	// $("#laser-counter").html("lasers:" + this.lasers.length)
}

Game.prototype.add = function(object){
	// if (this.objects.indexOf(object) == -1){
	this.objects.push(object)
	object.game = this
	return object
	// }
}

Game.prototype.remove = function(object){
	index = this.objects.indexOf(object)
	if (index >= 0){
		this.objects.splice(index, 1)
		object.game = null
	}
}

// Game.prototype.removeExplosion = function(explosion){
// 	index = this.explosions.indexOf(explosion)
// 	if (index >= 0){
// 		this.explosions.splice(index, 1)
// 		explosion.game = null
// 	}
// }

Game.prototype.ships = function(){
	var ships = []
	this.objects.forEach(function(object){
		if (object.fireBullet){
			ships.push(object)
		}
	})
	return ships
}

Game.prototype.rockets = function(){
	var rockets = []
	this.objects.forEach(function(object){
		if (object.constructor == Rocket){
			rockets.push(object)
		}
	})
	return rockets
}

Game.prototype.playerShip = function(){
	for (var i = 0; i < this.objects.length; i++) {
		if(this.objects[i].constructor == PlayerShip){
			return this.objects[i]
		}
	}
}

Game.prototype.matters = function(){
	return this.lasers.concat(this.entities).concat(this.objects)
}

Game.prototype.playMusic = function(){

}

Game.prototype.motherShip = function(){
	for (var i = 0; i < this.objects.length; i++) {
		if (this.objects[i].constructor == MotherShip){
			return this.objects[i]
		}
	};
}