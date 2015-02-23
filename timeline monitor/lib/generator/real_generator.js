(function(){
	var RealGenerator = TM.RealGenerator = function(ring){
		this.realIndex = ring.realIndex = {}
		this.preIndex = {}
		ring.realGenerator = this
		this.constructor._super.call(this, ring)
	}

	RealGenerator.inherits(TM.Generator)

	RealGenerator.buildGenerators = function(timeline){
		timeline.rings.forEach(function(ring){
			new TM.RealGenerator(ring)
		})
	}

	RealGenerator.prototype.genData = function(){
		this.genPreData()
		this.genRealData()
	}

	RealGenerator.prototype.genRealData = function(){
		for(var i = this.timeline.startTime(); i < this.timeline.time; i++){
			if (!this.realIndex[i] && i < Date.nowInSeconds()){
				this.realIndex[i] = this.forgeRealData(i)
			}
		}
	}

	RealGenerator.prototype.forgeRealData = function(time){
		var phaseIndex = this.getPhaseIndex(time)
		var phaseData = this.preIndex[time].phases[phaseIndex]
		var duration = time - this.getPhaseStart(time)
		var data = {}
		this.forgeMajorData(duration, phaseData, data)
		this.forgeMinorData(duration, phaseData, data)
		this.forgePhaseData(time, phaseData, data)
		this.forgeMarkerData(data)
		return data
	}

	RealGenerator.prototype.forgeMajorData = function(duration, phaseData, data){
		var start = 0
		if (duration < (start += phaseData.green)){
			data.green = 1
		} else if (duration < (start += phaseData.amber)){
			data.amber = 1
		} else {
			data.red = 1
		}
	}

	RealGenerator.prototype.forgeMinorData = function(duration, phaseData, data){
		var start = 0
		if (duration < (start += phaseData.walk)){
			data.walk = 1
		} else if (duration < (start += phaseData.dw)){
			data.dw = 1
		}
		var ppStart = phaseData.green - phaseData.pp
		duration >= ppStart && duration < phaseData.walk && (data.pp = 1)
	}

	RealGenerator.prototype.forgePhaseData = function(time, phaseData, data){
		data.ph = this.getPhaseNum(time)	
		if(time == this.getPhaseStart(time)){
			data.text = phaseData.text
		}	
	}

	RealGenerator.prototype.forgeMarkerData = function(data){
		Math.roll(0.02) && (data.marker = Math.randInt(0,25))	
	}

})()