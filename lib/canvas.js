Canvas = Xpace.Canvas = {}
Canvas.inView = function(point){
	if (point[0] <= canvas.width && point[0] >= 0){
		if (point[1] <= canvas.height && point[1] >= 0){
			return true
		}  
	}
	return false
}

Canvas.inBound = function(point){
	if (point[0] <= canvas.width * 2 && point[0] >= - canvas.width){
		if (point[1] <= canvas.height * 2 && point[1] >= - canvas.height){
			return true
		}
	}
	return false
}

Canvas.randomSpawnPos = function(){
	while (true){
		var pos = []
		pos[0] = randBetween(- canvas.width, canvas.width * 2)
		pos[1] = randBetween(- canvas.height, canvas.height * 2)
		if (!Canvas.inView(pos)){
			return pos
		}
	}
}

<<<<<<< HEAD
Canvas.position = function(){
	return [canvas.width / 2, canvas.height / 2]
}

=======
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
Canvas.center = function(){
	return [canvas.width / 2, canvas.height / 2]
}

<<<<<<< HEAD
Canvas.diagonal = function(){
	return magnitude([canvas.height, canvas.width])
}

Canvas.east = function(){
	return [canvas.width + canvas.width / 2, canvas.height / 2]
}

var background = $('<img>')[0]
background.onload = function(){
	PlayerShip.IMAGE.src = "media/playerShip.png"
}
background.src = "background.jpg"
=======
var background = $('<img src ="background.jpg">')[0]
>>>>>>> 8aa7e1264af1bc70f7e164feebb127937f12bde7
