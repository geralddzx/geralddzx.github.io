var Game = Xpace.Game = function(num){
	this.objects = []
	this.explosions = []
	this.add(new PlayerShip(this))
	this.start()
	this.playMusic()
}

Game.SPEED = 1

Game.prototype.spawnShips = function(int){
	var game = this
	setInterval(function(){
		game.add(new BulletShip(game))
	}, 2000)
	setInterval(function(){
		game.add(new RocketShip(game))
	}, 3000)
}

Game.prototype.spawnRocks = function(int){
	this.rocks = []
	var game = this
	setInterval(function(){
		if (game.rocks.length < 1000){
			var rock = new Rock(game)
			game.rocks.push(rock)
			game.objects.push(rock.asteroid)
		}
	}, 300)
}

Game.prototype.entities = function(){
	var entities = []
	this.objects.forEach(function(object){
		if (object.constructor != Asteroid){
			entities.push(object)
		}
	})
	return entities.concat(this.rocks)
}

Game.prototype.start = function(){
	game = this
	setInterval(function(){
		game.step()
		game.checkCollisions()
		game.checkInBound()
		game.resetMatters()
		game.draw()
	}, 15)
	this.spawnShips()
	this.spawnRocks()
}

Game.prototype.step = function(){
	this.objects.concat(this.explosions).forEach(function(object){
		object.step()
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

Game.prototype.resetMatters = function(){
	this.resetRocks()
	this.resetObjects()
	this.resetExplosions()
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

Game.prototype.resetRocks = function(){
	var rocks = []
	var game = this
	this.rocks.forEach(function(rock){
		if (rock.game == game){
			rocks.push(rock)
		}
	})
	this.rocks = rocks
}

Game.prototype.draw = function(){
	ctx.drawImage(background, 0, 0)
	this.matters().forEach(function(entity){
		entity.draw()
	})
	$("#counter").html("Objects:" + this.objects.length)
	$("#rock-counter").html("rocks:" + this.rocks.length)
	$("#ship-counter").html("ships:" + this.ships().length)
	$("#explosion-counter").html("explosions:" + this.explosions.length)
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

Game.prototype.createExplosion = function(object){
	this.explosions.push(new Explosion(this, object.pos, object.explosionRadius()))
}

// Game.prototype.removeExplosion = function(explosion){
// 	index = this.explosions.indexOf(explosion)
// 	if (index >= 0){
// 		this.explosions.splice(index, 1)
// 		explosion.game = null
// 	}
// }

Game.prototype.resetExplosions = function(){
	var explosions = []
	var game = this
	this.explosions.forEach(function(explosion){
		if (explosion.game == game){
			explosions.push(explosion)
		}
	})
	this.explosions = explosions
}

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
	return this.entities().concat(this.explosions)
}

Game.prototype.playMusic = function(){

}