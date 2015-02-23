(function(){
	var DataPaint = TM.DataPaint = function(ring, profile){
		this.ring = ring
		this.profile = profile
	}

	DataPaint.prototype.drawPhase = function(startTime, phaseData){
		this.drawBar("green", "major", startTime, phaseData.green)
		this.drawBar("walk", "minor", startTime, phaseData.walk)
		this.drawBar("dw", "minor", startTime + phaseData.walk, phaseData.dw)
		var ppStart = this.ppStart(phaseData)
		this.drawBar("pp", "pp", startTime + ppStart, phaseData.pp)
		phaseData.text && this.drawText(startTime, phaseData.text)
		startTime = startTime + phaseData.green
		this.drawBar("amber", "major", startTime, phaseData.amber)
		startTime = startTime + phaseData.amber
		this.drawBar("red", "major", startTime, phaseData.red)
	}

	DataPaint.prototype.drawBar = function(state, type, startTime, duration){
		var x0 = this.tRuler.xPos(startTime)
		var x1 = this.tRuler.xPos(startTime + duration)
		var y0 = this.barPos() + this.ruler.elementOffset(type)
		var height = this.ruler.barHeight(type)
		var color = this.profile.lightColors(state)
		canvas.fillRect(color, x0, y0, x1 - x0, height)
	}

	DataPaint.prototype.drawText = function(startTime, text){
		var x0 = this.tRuler.xPos(startTime) + this.tRuler.dataWidth(2)
		var y0 = this.barPos() + this.ruler.barHeight() * 0.5
		var height = this.ruler.barHeight() * 0.8
		canvas.fillText("black", height, text, x0, y0, "left", "middle")
	}

})()