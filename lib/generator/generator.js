(function(){
	var Generator = TM.Generator = function(timeline){
		this.timeline = timeline
		this.time = this.timeline.time
	}
	
	Generator.prototype.start = function(){
		setInterval(this.step.bind(this), 1000)
	}

	Generator.prototype.step = function(){
		this.time = this.time + 1
		this.genData()
	}

	// Generator.nextState = function(currentState){
	// 	var index = Generator.states.indexOf(currentState)
	// 	return Generator.states[(index + 1) % 3]
	// }

	Generator.shift = {
		"green": 0.03,
		"yellow": 0.4,
		"red": 0.4,
	}

	Generator.lengths = {
		"green": 30,
		"yellow": 3,
		"red": 3,
	}

	Generator.minorStates = [
		"white",
		"red",
	]

	Generator.colors = {
		green: "#33CC00",
		red: "#CC0000",
		yellow: "#FFFF00",
		flash: "#6666CC",
		white: "#FFFFFF",
	}

	Generator.flashState = "flash"
})()