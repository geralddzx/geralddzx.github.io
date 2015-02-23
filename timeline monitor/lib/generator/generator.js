(function(){
	var Generator = TM.Generator = function(ring){
		this.ring = ring
		this.timeline = ring.timeline
		if (ring.phases.length){
			this.initializePreData()
		}
	}

	Generator.prototype.initializePreData = function(){
		var initialData = this.genCycleData()
		var timeline = this.ring.timeline
		var randStart = Math.randInt(timeline.time - 80, timeline.time)
		this.preIndex.start = randStart
		this.preIndex.end = randStart + initialData.duration
		this.setData(randStart, initialData)
	}

	Generator.prototype.setData = function(startTime, data){
		data.startTime = startTime
		for(var i = startTime; i < startTime + data.duration; i++){
			this.preIndex[i] = data
		}
	}

	Generator.prototype.genPreData = function(){
		var timeline = this.ring.timeline
		var preIndex = this.preIndex
		var startTime = timeline.time - timeline.displaySize()
		while(!preIndex[startTime]){
			startTime < preIndex.start && this.genBackward()
			startTime > preIndex.start && this.genForward()
		}
		while(!preIndex[timeline.time]){
			this.genForward()
		}
	}

	Generator.prototype.genForward = function(){
		var startTime = this.preIndex.end
		var data = this.genCycleData()
		this.setData(startTime, data)
		this.preIndex.end = startTime + data.duration
	}

	Generator.prototype.genBackward = function(){
		var data = this.genCycleData()
		var startTime = this.preIndex.start - data.duration
		this.setData(startTime, data)
		this.preIndex.start = startTime
	}

	Generator.prototype.genCycleData = function(){
		var data = {}
		data.phases = []
		this.ring.phases.forEach(function(phase){
			data.phases.push(Generator.genPhaseData(phase))
		})
		data.duration = Generator.getCycleDuration(data)
		return data
	}

	Generator.genPhaseData = function(phase){
		var data = {}
		data.green = Math.randInt(25, 45)
		data.text = phase.name + ": " + data.green
		data.walk = Math.roll(0.5) && Math.randInt(1, data.green)
		data.dw = data.walk && data.green - data.walk
		data.amber = Math.randInt(1, 5)
		data.red = Math.randInt(1, 4)
		data.walk && (data.pp = Math.randInt(20, 25))
		return data
	}

	Generator.getPhaseDuration = function(phaseData){
		return phaseData.green + phaseData.amber + phaseData.red
	}

	Generator.getCycleDuration = function(cycleData){
		var total = 0
		cycleData.phases.forEach(function(phaseData){
			total += Generator.getPhaseDuration(phaseData)
		})
		return total
	}

	Generator.prototype.getPhaseIndex = function(time){
		var cycleData = this.preIndex[time]
		var endTime = cycleData.startTime
		for(var i = 0; i < cycleData.phases.length; i++){
			var duration = Generator.getPhaseDuration(cycleData.phases[i])
			if (time < (endTime += duration)){
				return i
			}
		}
	}

	Generator.prototype.getPhaseNum = function(time){
		var cycleData = this.preIndex[time]
		var index = this.getPhaseIndex(time)
		var phaseData = cycleData.phases[index]
		return TM.getPhaseNum(phaseData.text)
	}

	Generator.prototype.getPhaseStart = function(time){
		var cycleData = this.preIndex[time]
		var index = this.getPhaseIndex(time)
		var total = 0
		for(var i = 0; i < index; i++){
			var duration = Generator.getPhaseDuration(cycleData.phases[i])
			total += duration
		}
		return total + cycleData.startTime
	}

	Generator.turnover = {
		"green": 0.03,
		"yellowamber": 0.3,
		"red": 0.3,
	}

	Generator.frequency = {
		"green": 0.8,
		"amber": 0.1,
		"red": 0.1,
	}
})()