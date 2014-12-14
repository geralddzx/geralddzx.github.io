(function(){
	var PreGenerator = TM.PreGenerator = function(ring){
		this.ring = ring
		this.index = ring.preIndex
		this.initializeData()
		this.start()
	}

	PreGenerator.inherits(TM.Generator)

	PreGenerator.buildGenerators = function(timeline){
		timeline.rings.each(function(ring){
			new TM.PreGenerator(ring)
		})
	}

	PreGenerator.prototype.initializeData = function(){
		if(!this.index.keys().length && this.ring.phases.length){
			var initialData = this.genRingData()
			var timeline = this.ring.timeline
			var randStart = Math.randInt(timeline.time - 80, timeline.time)
			this.index.start = randStart
			this.index.end = randStart + initialData.duration
			this.setData(randStart, Math.randInt(0, 100), initialData)
		}
	}

	PreGenerator.prototype.setData = function(startTime, cycle, data){
		data.startTime = startTime
		data.cycle = cycle
		for(var i = startTime; i < startTime + data.duration; i++){
			this.index[i] = data
		}
	}

	PreGenerator.prototype.genData = function(){
		if (this.ring.phases.length){
			var timeline = this.ring.timeline
			var index = this.index
			var startTime = timeline.time - timeline.displaySize()
			while(!index[startTime]){
				startTime < index.start && this.genBackward()
				startTime > index.start && this.genForward()
			}
			while(!index[timeline.time]){
				this.genForward()
			}
		}
	}

	PreGenerator.prototype.genForward = function(){
		var startTime = this.index.end
		var cycle = this.index[this.index.end - 1].cycle + 1
		var data = this.genRingData()
		this.setData(startTime, cycle, data)
		this.index.end = startTime + data.duration
	}

	PreGenerator.prototype.genBackward = function(){
		var data = this.genRingData()
		var cycle = this.index[this.index.start].cycle - 1
		var startTime = this.index.start - data.duration
		this.setData(startTime, cycle, data)
		this.index.start = startTime
	}

	PreGenerator.prototype.genRingData = function(){
		var data = {}
		var startTime = 0
		data.phases = []
		this.ring.phases.each(function(phase){
			var phaseData = PreGenerator.genPhaseData(startTime, phase)
			data.phases.push(phaseData)
			startTime = phaseData.endTime
		})
		data.duration = startTime
		console.log(data)
		return data
	}

	PreGenerator.genPhaseData = function(startTime, phase){
		var data = {}
		data.name = phase.name
		data.startTime = startTime
		data.majorStops = PreGenerator.genMajorStops(startTime)
		var minorStart = data.majorStops[0].startTime
		var minorEnd = data.majorStops[1].startTime
		data.minorStops = PreGenerator.genMinorStops(minorStart, minorEnd)
		data.flashStop = PreGenerator.genFlashStops(data.minorStops)
		data.endTime = data.majorStops.last().endTime
		return data
	}

	PreGenerator.genMajorStops = function(startTime){
		var stops = []
		TM.Generator.lengths.keys().each(function(state){
			var stop = {}
			var length = TM.Generator.lengths[state]
			stop.state = state
			stop.startTime = startTime
			stop.endTime = startTime + Math.randInt(length * 0.9, length * 1.1)
			stops.push(stop)
			startTime = stop.endTime
		})
		return stops
	}

	PreGenerator.genMinorStops = function(startTime, endTime){
		var stop1 = {state: TM.Generator.minorStates[0]}
		var stop2 = {state: TM.Generator.minorStates[1]}
		stop1.startTime = startTime
		stop1.endTime = Math.randInt(startTime + 1, endTime) 
		stop2.startTime = stop1.endTime
		stop2.endTime = endTime
		return [stop1, stop2]
	}

	PreGenerator.genFlashStops = function(minorStops){
		var stop = {}
		stop.state = TM.Generator.flashState
		stop.startTime = Math.randInt(minorStops[0].startTime, minorStops[0].endTime)
		if (Math.roll(0.5)){
			stop.endTime = minorStops[0].endTime
		} else {
			stop.endTime = minorStops[1].endTime
		}
		return stop
	}
})()