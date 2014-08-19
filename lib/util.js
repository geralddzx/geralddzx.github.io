Function.prototype.inherits = function(superClass){
	this.prototype = Object.create(superClass.prototype)
	this.prototype.constructor = this
	this._super = superClass
}

genVector = function(magnitude, direction){
	vec = []
	vec[0] = magnitude * Math.cos(direction)
	vec[1] = magnitude * Math.sin(direction) * -1
	return vec
}

randBetween = function(min, max){
	return Math.random() * (max - min) + min
}

degToRad = function(degrees){
	Math.PI / 180 * degrees
}

distance = function(vec1, vec2){
	var dx = Math.abs(vec1[0] - vec2[0])
	var dy = Math.abs(vec1[1] - vec2[1])
	return Math.sqrt(dx * dx + dy * dy)
}

magnitude = function(vector){
	var dx = vector[0]
	var dy = vector[1]
	return Math.sqrt(dx * dx + dy * dy)
}

addVectors = function(vec1, vec2){
	return [vec1[0] + vec2[0], vec1[1] + vec2[1]]
}

subtractVectors = function(vec1, vec2){
	return [vec1[0] - vec2[0], vec1[1] - vec2[1]]
}

timesVector = function(factor, vector){
	return [factor * vector[0], factor * vector[1]]
}

unitVector = function(vector){
	return genVector(1, genDirection(vector))
}

genDirection = function(vector){
	var angle = Math.atan(vector[1] * -1 / vector[0])
	if (vector[0] < 0) {
		angle += Math.PI
	}
	return quadAngle(angle)
}

quadAngle = function(angle){
	return (angle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)
}

Array.prototype.include = function(obj){
	return this.indexOf(obj) != -1
}
// collided = function(obj1, obj2){
// 	if (obj1.rocks){
// 		for(var i = 0; i < obj.rocks.length, i++){
// 			if (obj2.rocks){
// 				for(var j = 0; j < obj.rocks.length, j++){
// 					if MovingObject.touch(obj1.rocks[i], obj2.rocks[j]){
// 						return true
// 					}
// 				} else {
// 					if MovingObject(obj1.rocks[i], obj2){
// 						return true
// 					}
// 				}
// 			}
// 		} 
// 	} else {
// 		if 
// 	}

// }