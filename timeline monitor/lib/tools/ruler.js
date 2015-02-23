(function (){
	var Ruler = TM.Ruler = function(ring){
		this.ring = ring
		this.timeline = ring.timeline
	}

	Ruler.prototype.yPos = function(){
		return this.ring.number * this.timeline.ringHeight()
	}

	Ruler.prototype.barHeight = function(type){
		var height = {
			major: 1.0,
			minor: 0.2,
			pp: 0.4,
		}
		if(!type){return this.timeline.ringHeight() / 5}
		return height[type] * this.barHeight()
	}

	Ruler.prototype.preBarPos = function(){
		return this.yPos() + this.timeline.ringHeight() / 20
	}

	Ruler.prototype.realBarPos = function(){
		return this.preBarPos() + this.timeline.ringHeight() * 0.3 
	}

	Ruler.prototype.elementOffset = function(type){
		var offset = {
			major: 0.0,
			minor: 0.4,
			pp: 0.6,
		} 
		return offset[type] * this.barHeight()
	}

	Ruler.prototype.ringMarkerPos = function(){
		var y0 = this.preBarPos()
		var y1 = this.markerLinePos() - this.ring.timeline.pointerRadius()
		return [y0, y1]
	}

	Ruler.prototype.phaseMarkerPos = function(){
		var y0 = this.realBarPos()
		var y1 = this.realBarPos() + this.barHeight()
		return [y0, y1]
	}

	Ruler.prototype.markerLinePos = function(){
		return this.yPos() + this.ring.timeline.ringHeight() * 0.75
	}
})()