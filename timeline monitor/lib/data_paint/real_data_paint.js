(function (){
	var RealDataPaint = TM.RealDataPaint = function(ring, profile){
		this.constructor._super.call(this, ring, profile)
		this.ruler = ring.ruler
		this.tRuler = ring.timeline.ruler
		this.timeline = ring.timeline
		this.index = ring.realIndex
	}

	RealDataPaint.inherits(TM.DataPaint)

	RealDataPaint.prototype.draw = function(){
		var paint = this
		this.parsePhasesData()
		this.phasesData.forEach(function(phaseData){
			paint.drawPhase(phaseData.startTime, phaseData)
		})
		
	}

	RealDataPaint.prototype.parsePhasesData = function(){
		this.phasesData = []
		startTime = this.findStart()
		for(var i = startTime; i < this.timeline.time; i++){
			this.index[i] && this.parseData(i)
		}
	}

	RealDataPaint.prototype.findStart = function(){
		var time = this.timeline.startTime()
		while(this.index[time - 1] && !this.index[time].text){
			time -= 1
		}
		return time
	}

	RealDataPaint.prototype.createPhaseData = function(startTime, text){
		var data = {}
		data.startTime = startTime
		TM.Timeline.states.forEach(function(state){
			data[state] = 0
		})
		data.nopp = 0
		data.noppCounter = true
		data.text = text
		this.phasesData.push(data)
		return data
	}

	RealDataPaint.prototype.parseData = function(time){
		var data = this.index[time]
		data.text && this.createPhaseData(time, data.text)
		var phaseData = (this.phasesData[this.phasesData.length -1] || this.createPhaseData(time))
		TM.Timeline.states.forEach(function(state){
			data[state] && (phaseData[state] += data[state])
		})
		data.pp && (phaseData.noppCounter = false)
		!data.pp && phaseData.noppCounter && (phaseData.nopp += 1)
	}

	RealDataPaint.prototype.ppStart = function(phaseData){
		return phaseData.nopp
	}

	RealDataPaint.prototype.barPos = function(){
		return this.ruler.realBarPos()
	}	
})()