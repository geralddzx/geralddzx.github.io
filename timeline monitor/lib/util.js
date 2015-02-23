Function.prototype.inherits = function(superClass){
	this.prototype = Object.create(superClass.prototype)
	this.prototype.constructor = this
	this._super = superClass
}

Array.prototype.rand = function(){
	var index = Math.floor((Math.random() * this.length))
	return this[index]
}

Math.randInt = function(start, end){
	start = Math.round(start)
	end = Math.round(end)
	var range = end - start
	return start + Math.floor(Math.random() * range)
}

Math.roll = function(prob){
	if(Math.random() < prob){
		return 1
	} else {
		return 0
	}
}

Math.range = function(n1, n2){
	var range = []
	for(var i = n1; i < n2; i++){
		range.push(i)
	}
	return range
}

Math.distance = function(x0, y0, x1, y1){
	var a = (x0 - x1)
	var b = (y0 - y1)
	return Math.sqrt(a * a + b * b)
}

Math.bound = function(n, lower, upper){
	n = Math.max(n, lower)
	n = Math.min(n, upper)
	return n
}

String.prototype.times = function(num){
	var str = ""
	for(var i = 0; i < num; i++){
		str = str + this
	}
	return str
}

TM.getPhaseNum = function(phaseText){
	var string = phaseText.split(":")[0].slice(2)
	return parseInt(string)
}

Date.nowInSeconds = function(){
	return Math.floor(Date.now() / 1000)
}

Math.between = function(n, n0, n1){
	return n >= n0 && n <= n1
}