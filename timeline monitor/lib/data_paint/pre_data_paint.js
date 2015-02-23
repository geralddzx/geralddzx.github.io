(function (){
	var PreDataPaint = TM.PreDataPaint = function(ring, profile){
		this.constructor._super.call(this, ring, profile)
		this.ruler = ring.ruler
		this.tRuler = ring.timeline.ruler
		this.timeline = ring.timeline
		this.index = ring.preIndex
	}

	PreDataPaint.inherits(TM.DataPaint)

	PreDataPaint.prototype.draw = function(){
		var timeline = this.timeline
		var drawnCycles = []
		for (var i = timeline.startTime(); i < timeline.time; i++){
			var cycle = this.index[i]
			if(cycle && drawnCycles.indexOf(cycle) == -1){
				this.drawCycle(cycle)
				drawnCycles.push(cycle)
			}
		}
	}

	PreDataPaint.prototype.drawCycle = function(cycleData){
		var paint = this
		var startTime = cycleData.startTime
		cycleData.phases.forEach(function(phaseData){
			paint.drawPhase(startTime, phaseData)
			startTime += TM.Generator.getPhaseDuration(phaseData)
		})
	}

	PreDataPaint.prototype.ppStart = function(phaseData){
		return phaseData.green - phaseData.pp
	}

	PreDataPaint.prototype.barPos = function(){
		return this.ruler.preBarPos()
	}

	
})()