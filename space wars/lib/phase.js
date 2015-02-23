(function (){
	var Phase = TM.Phase = function(number, ring){
		this.number = number
		this.name = "P" + (number + 1)
		ring.phases.push(this)
		this.ring = ring
	}

	Phase.genPhases = function(ring){
		for(var i = ring.number * 4; i < ring.number * 4 + 4; i++){
			if (Math.round(Math.random())){
				new Phase(i, ring)
			}
		}
	}

	Phase.prototype.index = function(){
		return this.ring.getPhaseIndex(this.name)
	}

	Phase.prototype.draw = function(){
		this.drawLabel()
	}

	Phase.prototype.labelPos = function(){
		var yOffset = 0.25 * this.ring.height() * this.index()
		var yPos = this.ring.pos()[1] + yOffset
		return [95.0, yPos]
	}

	Phase.prototype.currentState = function(){
		if (this.ring.currentPhase == this.name){
			return this.ring.currentPhaseState()
		} else {
			return "red"
		}
	}

	Phase.prototype.drawLabel = function(){
		ctx.fillStyle = this.currentState()
		ctx.textBaseline = "top"
		var xPos = canvas.getX(this.labelPos()[0])
		var yPos = canvas.getY(this.labelPos()[1])
		ctx.fillText(this.name, xPos, yPos)
	}
})()