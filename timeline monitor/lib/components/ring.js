(function (){
	var Ring = TM.Ring = function(number, timeline){
		this.timeline = timeline
		this.number = number
		this.name = "R" + (number + 1)
		
		TM.Phase.genPhases(this)
		this.ruler = new TM.Ruler(this)
		this.tRuler = this.timeline.ruler
		this.preIndex = {}
		this.realIndex = {}
	}

	Ring.genRings = function(timeline){
		timeline.rings = []
		var numRings = Math.randInt(2, 5)
		for (var i = 0; i < numRings; i++){
			var ring = new Ring(i, timeline)
			timeline.rings.push(ring)
		}
	}

	Ring.prototype.genData = function(){
		if(this.phases.length){
			this.preGenerator.genData()
			this.realGenerator.genData()
		}
	}

	Ring.prototype.currentData = function(){
		return this.realIndex[this.timeline.time - 1]
	}

	// 	Ring.prototype.currentData = function(){
	// 	if (this.timeline.currentData()){
	// 		return this.timeline.currentData().rings[this.name]
	// 	} else {
	// 		return null
	// 	}
	// }

	// Ring.prototype.currentPhase = function(){
	// 	if (this.currentData()){
	// 		return this.currentData().phase
	// 	} else {
	// 		return null
	// 	}
	// }

	// Ring.prototype.currentPhaseState = function(){
	// 	if (this.currentData()){
	// 		return this.currentData().state
	// 	} else {
	// 		return null
	// 	}
	// }

	



	// Ring.prototype.borderPos = function(){
	// 	var xStart = canvas.getX(this.pos()[0] + TM.Offset.ringBorder[0])
	// 	var yStart = canvas.getY(this.pos()[1] + this.height() + TM.Offset.ringBorder[1])
	// 	var xEnd = canvas.getX(100 - TM.Offset.ringBorder[0])
	// 	var yEnd = yStart
	// 	return [xStart, yStart, xEnd, yEnd]
	// }


	// Ring.prototype.nextPhase = function(currentPhaseName){
	// 	var currentIndex = this.phases.findIndex(function(phase){
	// 		return phase.name == currentPhaseName
	// 	})
	// 	nextIndex = (currentIndex + 1) % this.phases.length
	// 	return this.phases[nextIndex]
	// }



	// Ring.prototype.getPhaseIndex = function(phaseName){
	// 	this.phases.findIndex(function(phase){
	// 		return phase.name == phaseName
	// 	})
	// }


	




	

	

	

	

	// Ring.prototype.realBarPos = function(){
	// 	return [5.0, this.pos()[1] + this.height() * 0.3]
	// }


	




})()

