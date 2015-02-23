(function(){
	var DetGenerator = TM.DetGenerator = function(detector){
		this.index = detector.dataIndex = {}
		this.detector = detector
		detector.generator = this
		this.timeline = detector.timeline
	}

	DetGenerator.inherits(TM.Generator)

	DetGenerator.buildGenerators = function(timeline){
		timeline.detectors.forEach(function(detector){
			new TM.DetGenerator(detector)
		})
	}

	DetGenerator.prototype.genData = function(){
		this.genDetData()
	}

	DetGenerator.prototype.genDetData = function(){
		var startTime = this.timeline.startTime()
		for(var i = startTime; i < this.timeline.time; i++){
			if(i < Date.nowInSeconds() && !this.index[i]){
				this.index[i] = this.forgeDetData(i)
			}
		}
	}

	DetGenerator.prototype.forgeDetData = function(time){
		var data = {}
		data.status = DetGenerator.status.rand()
		var compData = this.index[time - 1] || this.index[time + 1]
		if (compData){
			Math.roll(0.8) && (data.status = compData.status)
		}
		data.status == "Failed" && (data.failType = "communications")
		data.volume = DetGenerator.randVolume()
		if(data.volume){
			data.occupancy = 1
		} else {
			data.occupancy = 0
		}
		return data
	}	

	DetGenerator.randVolume = function(){
		var roll = Math.random()
		var probs = DetGenerator.volumeProbs
		for(var i = 0; i < probs.length; i++){
			if (roll < probs[i]){
				return i
			}
		}
	}

	DetGenerator.volumeProbs = [
		0.95,
		0.99,
		0.9975,
		1.0,
	]	

	DetGenerator.status = [
		"Active",
		"Idle",
		"Disabled",
		"Failed",
		"Data Error",
	]
})()