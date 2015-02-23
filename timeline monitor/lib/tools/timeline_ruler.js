(function (){
	var TimelineRuler = TM.TimelineRuler = function(timeline){
		this.timeline = timeline
	}

	TimelineRuler.prototype.xPos = function(time){
		var timeline = this.timeline
		var offset = time - timeline.startTime()
		var offset = Math.bound(offset, 0, timeline.displaySize() * 2)
		return TimelineRuler.barStart + this.dataWidth(offset)
	}

	TimelineRuler.prototype.dataWidth = function(n){
		var displaySize = this.timeline.displaySize()
		return 90.0 / displaySize / 2 * n
	}

	TimelineRuler.prototype.markerLinePos = function(){
		var offset = this.timeline.ringHeight() * 0.25
		return 100 - this.timeline.ringHeight() + offset
	}

	TimelineRuler.barStart = 5.0
})()