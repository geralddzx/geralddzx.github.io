(function (){
	var Phase = TM.Phase = function(number, ring){
		this.number = number
		this.ph = (this.number + 1).toString()
		this.name = "Ph " + (number + 1)
		this.ring = ring
	}

	Phase.genPhases = function(ring){
		ring.phases = []
		for(var i = ring.number * 4; i < ring.number * 4 + 4; i++){
			if (Math.round(Math.random())){
				var phase = new Phase(i, ring)
				ring.phases.push(phase)
			}
		}
	}

	Phase.prototype.currentState = function(){
		var currentTime = this.ring.timeline.time - 1
		var phaseData = this.ring.realIndex[currentTime]
		var state = "red"
		if(!phaseData){
			return null
		} else if(phaseData.ph == this.ph){
			phaseData.green && (state = "green")
			phaseData.amber && (state = "amber")
		}
		return state
	}


})()