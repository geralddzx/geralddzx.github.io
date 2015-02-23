(function (){
	var Timeline = TM.Timeline = function(){
		this.time = Date.now()
		this.forward = 1
		this.rings = []
		this.zoom = 100
	}

	Timeline.prototype.start = function(){
		setInterval(this.step.bind(this), 1000)
	}

	Timeline.prototype.step = function(){
		this.time = this.time + this.forward
		this.draw()
	}

	Timeline.prototype.draw = function(){
		this.drawBackground()
		this.drawRings()
		this.drawCenterLine()
	}

	Timeline.prototype.drawCenterLine = function(){
		canvas.drawLine("white", 50.0, 0.0, 50.0, 100.0)
	}
	
	Timeline.prototype.drawBackground = function(){
		ctx.fillStyle = "black"
		ctx.fillRect(0, 0, canvas.width(), canvas.height())
	}

	Timeline.prototype.drawRings = function(){
		this.rings.each(function(ring){
			ring.draw()
		})
	}

	Timeline.prototype.displaySize = function(){
		return this.cycleTime * 100 / this.zoom
	}

	Timeline.prototype.startTime = function(){
		return this.time - this.displaySize()
	}

	Timeline.prototype.endTime = function(){
		return this.time + this.displaySize()
	}

	Timeline.prototype.dataWidth = function(){
		return 90.0 / this.displaySize() / 2
	}

	Timeline.prototype.setCycleTime = function(cycleTime){
		this.cycleTime = cycleTime
	}

	Timeline.prototype.getRing = function(name){
		var ring = this.rings.find(function(ring){
			return ring.name == name
		})
		return ring
	}

	Timeline.prototype.barXPos = function(time){
		var offset = time - this.startTime()
		var offset = Math.max(offset, 0)
		var offset = Math.min(offset, this.endTime())
		return Timeline.barStart + offset * this.dataWidth()
	}

	Timeline.prototype.height = function(){
		return 100.0 / (this.rings.length + 1)
	}

	// Timeline.prototype.currentData = function(){
	// 	return this.dataIndex[this.time]
	// }

	Timeline.barStart = 5.0

})()

