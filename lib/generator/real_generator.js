// (function(){
// 	var Generator = TM.Generator = function(timeline){
// 		this.timeline = timeline
// 		this.time = this.timeline.time
// 		this.initializePredictedData()
// 	}
	
// 	Generator.prototype.start = function(){
// 		setInterval(this.step.bind(this), 1000)
// 	}

// 	Generator.prototype.step = function(){
// 		this.time = this.time + 1
// 		// var realData = this.genRealData()
// 		this.genPredictedData()
// 	}

// 	Generator.prototype.initializePredictedData = function(){
// 		if(!this.timeline.dataIndex.predictedData.keys().length){

// 		}
// 	}

// 	Generator.prototype.genPredictedData = function(){
// 		var timeline = this.timeline
// 		var startTime = timeline.time - timeline.displaySize()
// 		while(!timeline.getPredictedData(startTime)){
// 			startTime < timeline.getFirstPredictedTime() && this.genBackward()
// 			startTime > timeline.getFirstPredictedTime() && this.genForward()
// 		}
// 		while(!timeline.getPredictedData(timeline.time)){
// 			this.genForward()
// 		}
// 	}

// 	Generator.genRingData = function(startTime, ring){
// 		var data = {}
// 		data.startTime = startTime
// 		ring.phases.each(function(phase){
// 			data.phases[phase.name] = Generator.genPhaseData(startTime, phase)
// 			startTime = data[phase.name].endTime
// 		})
// 		data.endTime = startTime
// 		return data
// 	}

// 	Generator.genPhaseData = function(startTime, phase){
// 		var data = {}
// 		data.startTime = startTime
// 		data.majorStops = Generator.genMajorStops(startTime)
// 		var minorStart = data.majorStops[0].startTime
// 		var minorEnd = data.majorStops[1].startTime()
// 		data.minorStops = Generator.genMinorStops(minorStart, minorEnd)
// 		data.flashStop = Generator.genFlashStops(data.minorStops)
// 		data.endTime = data.majorStops.last().endTime
// 	}

// 	Generator.genMajorStops = function(startTime){
// 		var stops = []
// 		Generator.lengths.keys().each(function(state){
// 			var stop = {}
// 			var length = Generator.lengths[state]
// 			stop.state = state
// 			stop.startTime = startTime
// 			stop.endTime = startTime + Math.randInt(length * 0.9, length * 1.1)
// 			stops.push(stop)
// 			startTime = stop.endTime
// 		})
// 		return stops
// 	}

// 	Generator.genMinorStops = function(startTime, endTime){
// 		var stop1 = {state: Generator.minorStates[0]}
// 		var stop2 = {state: Generator.minorStates[1]}
// 		stop1.startTime = startTime
// 		stop1.endTime = Math.randInt(startTime + 1, endTime) 
// 		stop2.startTime = stop1.endTime
// 		stop2.endTime = endTime
// 		return [stop1, stop2]
// 	}

// 	Generator.genFlashStops = function(minorStops){
// 		var stop = {}
// 		stop.state = Generator.flashState
// 		stop.startTime = Math.randInt(minorStops[0].startTime, minorStops[0].endTime)
// 		if (Math.roll(0.5)){
// 			stop.endTime = minorStops[0].endTime
// 		} else {
// 			stop.endTime = minorStops[1].endTime
// 		}
// 		return stop
// 	}

// 	Generator.prototype.genRealData = function(){
// 		var data = {time: this.time}
// 		data.rings = {}
// 		this.genRingsData(data.rings)
// 		return data
// 	}

// 	Generator.prototype.genRingsData = function(ringsData){
// 		for (var i = 0; i < this.timeline.rings.length; i++){
// 			var ring = this.timeline.rings[i]
// 			ringsData[ring.name] = {} 
// 			this.genRingData(ring, ringsData[ring.name])
// 		}
// 	}

// 	// Generator.prototype.genRingData = function(ring, ringData){
// 	// 	var prevData = this.timeline.dataIndex.realData[this.time - 1]
// 	// 	var prevRingData = prevData && prevData.rings[ring.name]
// 	// 	prevRingData = prevRingData || this.forgeRingData(ring)
// 	// 	if (prevRingData.phase && this.roll(prevRingData.state)){
// 	// 		this.forgeNextState(prevRingData, ringData, ring)
// 	// 	} else {
// 	// 		ringData.dupKeys(prevRingData)
// 	// 	}
// 	// }

// 	Generator.prototype.roll = function(state){
// 		return Math.roll(Generator.shift[state])
// 	}

// 	Generator.prototype.forgeRingData = function(ring){
// 		var data = {}
// 		if (ring.phases.length){
// 			data.phase = ring.phases.rand().name
// 			data.state = Generator.states.rand()
// 		}
// 		return data
// 	}

// 	Generator.prototype.forgeNextState = function(prevData, currentData, ring){
// 		currentData.state = Generator.nextState(prevData.state)
// 		currentData.phase = ring.nextPhase(prevData.phase).name
// 	}

// 	Generator.states = [
// 		"green",
// 		"yellow",
// 		"red",
// 	]

// 	Generator.nextState = function(currentState){
// 		var index = Generator.states.indexOf(currentState)
// 		return Generator.states[(index + 1) % 3]
// 	}

// 	Generator.shift = {
// 		"green": 0.03,
// 		"yellow": 0.4,
// 		"red": 0.4,
// 	}

// 	Generator.lengths = {
// 		"green": 80,
// 		"yellow": 3,
// 		"red": 3,
// 	}

// 	Generator.minorStates = [
// 		"white",
// 		"red",
// 	]

// 	Generator.flashState = "purple"
// })()