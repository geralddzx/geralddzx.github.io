(function (){
	var DataPen = TM.DataPen = function(ring){
		this.ring = ring
		this.timeline = ring.timeline
		this.index = ring.preIndex
		this.drawnCycles = []
	}

	DataPen.prototype.draw = function(){
		var range = Math.range(this.timeline.startTime(), this.timeline.time)
		var pen = this
		range.each(function(time){
			if(pen.index[time]){
				pen.drawCycle(pen.index[time])
			}
		})
	}

	DataPen.prototype.drawCycle = function(cycleData){
		if(!this.drawnCycles.include(cycleData)){
			var pen = this
			this.currentCycle = cycleData
			cycleData.phases.each(function(phaseData){
				pen.drawPhase(phaseData)
			})
			this.drawnCycles.push(cycleData)
		}
	}

	DataPen.prototype.drawPhase = function(phaseData){
		this.drawMajorStop(phaseData.majorStops[0])
		for (var i = 0; i < phaseData.minorStops.length; i++){
			this.drawMinorStop(phaseData.minorStops[i])
		}
		this.drawFlashStop(phaseData.flashStop)
		this.drawPhaseNum(phaseData)
		for (var i = 1; i < phaseData.majorStops.length; i++){
			this.drawMajorStop(phaseData.majorStops[i])
		}
	}

	DataPen.prototype.getXPos = function(data){
		var cycleStart = this.currentCycle.startTime
		var startX = this.timeline.barXPos(data.startTime + cycleStart)
		var duration = data.endTime - data.startTime
		var width = duration * this.timeline.dataWidth()
		return [startX, width]
	}

	DataPen.prototype.drawPhaseNum = function(phaseData){
		var text = phaseData.name + ":" + this.currentCycle.cycle
		var phaseTime = phaseData.startTime + this.currentCycle.startTime
		var xPos = this.timeline.barXPos(phaseTime)
		var yPos = this.ring.prePhaseLabelPos()
		var size = 1.9
		canvas.fillText("black", size, text, xPos, yPos)
	}

	DataPen.prototype.drawMinorStop = function(minorStopData){
		var xPos = this.getXPos(minorStopData)
		var yPos = this.ring.preMinorBarPos()
		var color = TM.Generator.colors[minorStopData.state]
		canvas.fillRect(color, xPos[0], yPos[0], xPos[1], yPos[1])
	}

	DataPen.prototype.drawMajorStop = function(majorStopData){
		var xPos = this.getXPos(majorStopData)
		var yPos = this.ring.preMajorBarPos()
		var color = TM.Generator.colors[majorStopData.state]
		canvas.fillRect(color, xPos[0], yPos[0], xPos[1], yPos[1])
	}

	DataPen.prototype.drawFlashStop = function(flashStopData){
		var xPos = this.getXPos(flashStopData)
		var yPos = this.ring.preFlashBarPos()
		var color = TM.Generator.colors[flashStopData.state]
		canvas.fillRect(color, xPos[0], yPos[0], xPos[1], yPos[1])
	}
})()