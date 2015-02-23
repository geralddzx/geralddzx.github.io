(function (){
	var PreDataPaint = TM.PreDataPaint = function(ring){
		this.ring = ring
		this.ruler = ring.ruler
		this.timeline = ring.timeline
		this.index = ring.preIndex
		this.draw()
	}

	PreDataPaint.prototype.draw = function(){
		var timeline = this.timeline
		var drawnCycles = []
		for (var i = timeline.startTime(); i < timeline.time; i++){
			var cycle = this.index[i]
			if(cycle && !drawnCycles.include(cycle)){
				this.drawCycle(cycle)
				drawnCycles.push(cycle)
			}
		}
	}

	PreDataPaint.prototype.drawCycle = function(cycleData){
		var paint = this
		var startTime = cycleData.startTime
		cycleData.phases.each(function(phaseData){
			paint.drawPhase(startTime, phaseData)
			startTime += TM.Generator.getPhaseDuration(phaseData)
		})
	}

	PreDataPaint.prototype.drawPhase = function(startTime, phaseData){
		this.drawBar("green", "major", startTime, phaseData.green)
		var walk = phaseData.walk
		var dw = phaseData.dw
		walk && this.drawBar("walk", "minor", startTime, walk)
		walk && dw && this.drawBar("dw", "minor", startTime + walk, dw)
		var pp = phaseData.pp 
		pp && this.drawBar("pp", "pp", startTime + phaseData.green - pp, pp)
		this.drawText(startTime, phaseData.text)
		startTime = startTime + phaseData.green
		this.drawBar("amber", "major", startTime, phaseData.amber)
		startTime = startTime + phaseData.amber
		this.drawBar("red", "major", startTime, phaseData.red)
	}

	PreDataPaint.prototype.drawBar = function(state, type, startTime, duration){
		var x0 = this.ruler.xPos(startTime)
		var x1 = this.ruler.xPos(startTime + duration)
		var y0 = this.ruler.preBarPos() + this.ruler.elementOffset(type)
		var height = this.ruler.barHeight(type)
		var color = Profile.lightColors[state]
		canvas.fillRect(color, x0, y0, x1 - x0, height)
	}

	PreDataPaint.prototype.drawText = function(startTime, text){
		var x0 = this.ruler.xPos(startTime) + this.ruler.dataWidth(1)
		var y0 = this.ruler.preBarPos() + this.ruler.elementOffset("text")
		var height = this.ruler.barHeight("text")
		canvas.fillText("black", height, text, x0, y0)
	}



	// PreDataPaint.prototype.drawMajorStop = function(majorStopData){
	// 	var xPos = this.getXPos(majorStopData)
	// 	var yPos = this.ring.preMajorBarPos()
	// 	var color = TM.Generator.colors[majorStopData.state]
	// 	canvas.fillRect(color, xPos[0], yPos[0], xPos[1], yPos[1])
	// } 
	// PreDataPaint.prototype.getXPos = function(data){
	// 	var cycleStart = this.currentCycle.startTime
	// 	var startX = this.timeline.barXPos(data.startTime + cycleStart)
	// 	var duration = data.endTime - data.startTime
	// 	var width = duration * this.timeline.dataWidth()
	// 	return [startX, width]
	// }

	// PreDataPaint.prototype.drawPhaseNum = function(phaseData){
	// 	var text = phaseData.name + ":" + this.currentCycle.cycle
	// 	var phaseTime = phaseData.startTime + this.currentCycle.startTime
	// 	var xPos = this.timeline.barXPos(phaseTime)
	// 	var yPos = this.ring.prePhaseLabelPos()
	// 	var size = 1.9
	// 	canvas.fillText("black", size, text, xPos, yPos)
	// }

	// PreDataPaint.prototype.drawMinorStop = function(minorStopData){
	// 	var xPos = this.getXPos(minorStopData)
	// 	var yPos = this.ring.preMinorBarPos()
	// 	var color = TM.Generator.colors[minorStopData.state]
	// 	canvas.fillRect(color, xPos[0], yPos[0], xPos[1], yPos[1])
	// }

	

	// PreDataPaint.prototype.drawFlashStop = function(flashStopData){
	// 	var xPos = this.getXPos(flashStopData)
	// 	var yPos = this.ring.preFlashBarPos()
	// 	var color = TM.Generator.colors[flashStopData.state]
	// 	canvas.fillRect(color, xPos[0], yPos[0], xPos[1], yPos[1])
	// }

	
})()