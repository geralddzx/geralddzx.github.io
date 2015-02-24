(function (){
	var Monitor = TM.Monitor = function(timeline, profile){
		this.timeline = timeline
		this.profile = profile
		timeline.monitor = this
		canvas = this.canvas = new Canvas(1080, 540)

		this.scroll = new TM.Scroll(this)
		this.buildControls()
		this.start()
	}

	Monitor.prototype.buildControls = function(){
		this.control = new TM.Control(this)
		this.speedControl = new TM.SpeedControl(this)
		this.sizeControl = new TM.SizeControl(this)
		this.config = new TM.Config(this)
	}

	Monitor.prototype.start = function(){
		this.step()
		setInterval(this.step.bind(this), 1000)
	}

	Monitor.prototype.step = function(){
		this.draw()
	}

	Monitor.prototype.draw = function(){
		this.drawBackground()
		this.drawRealData()
		this.drawCenterLine()
		this.drawPreData()
		this.drawRings()
		this.drawPhases()
		this.drawDevice()
		this.config.displayTimeline && this.scroll.draw()
		this.speedControl.buttonGroup.reset()
		this.sizeControl.buttonGroup.reset()
		this.config.draw()
		this.control.draw()
	}

	Monitor.prototype.drawBackground = function(){
		this.canvas.fillRect("black", 0, 0, 100.0, 100.0)
	}

	Monitor.prototype.drawRings = function(){
		if(this.config.displayRing){
			var monitor = this
			this.timeline.rings.forEach(function(ring){
				monitor.drawRing(ring)
			})
		}
	}

	Monitor.prototype.drawRing = function(ring){
		this.drawRingLabel(ring)
		this.drawRingBorder(ring)
		ring.phases.length && this.drawRingMarkerLine(ring)
		this.drawRingMarkers(ring)
	}

	Monitor.prototype.drawRingLabel = function(ring){
		var xPos = 1.0
		var yPos = ring.ruler.yPos() + 1.0
		var height = ring.ruler.barHeight() * 0.8
		this.canvas.fillText("white", height, ring.name, xPos, yPos, "left", "top")
	}

	Monitor.prototype.drawRingBorder = function(ring){
		var x0 = 2.0
		var y0 = ring.ruler.yPos() + this.timeline.ringHeight()
		var x1 = 98.0
		var y1 = y0
		this.canvas.drawLine("grey", x0, y0, x1, y1)
	}

	Monitor.prototype.drawRingMarkerLine = function(ring){
		var x0 = TM.TimelineRuler.barStart
		var y0 = ring.ruler.markerLinePos()
		var x1 = 50.0
		this.canvas.drawLine("white", x0, y0, x1, y0)
	}

	Monitor.prototype.drawRingMarkers = function(ring){
		var startTime = this.timeline.startTime()
		for(var i = startTime; i < this.timeline.time; i++){
			if(ring.realIndex[i] && ring.realIndex[i].marker){
				var marker = this.profile.markers[ring.realIndex[i].marker]
				marker.type != "timeline" && this.drawRingMarker(i, marker, ring)
			}
		}
	}

	Monitor.prototype.drawRingMarker = function(time, marker, ring){
		var xPos = ring.tRuler.xPos(time)
		if(marker.type == "phase"){
			var yPos = ring.ruler.phaseMarkerPos()
		} else if(marker.type == "ring"){
			var yPos = ring.ruler.ringMarkerPos()
		}
		var color = marker.color
		var timeline = this.timeline
		var grad = marker.gradient
		new TM.Pointer(color, xPos, yPos[0], yPos[1], grad, timeline).draw()
	}

	Monitor.prototype.drawPhases = function(){
		var monitor = this
		if(this.config.displayPhase){
			this.timeline.rings.forEach(function(ring){
				ring.phases.forEach(function(phase){
					monitor.drawPhase(phase)
				})
			})
		}
	}

	Monitor.prototype.drawPhase = function(phase){
		var state = phase.currentState()
		if(!state){return false}
		var color = this.profile.lightColors(state)
		var xPos = 95
		var yOffset = this.timeline.ringHeight() * (phase.number % 4) / 4
		var yPos = phase.ring.ruler.yPos() + yOffset + 1
		var height = this.timeline.ringHeight() * 0.16
		this.canvas.fillText(color, height, phase.name, xPos, yPos, "left", "top")
	}

	Monitor.prototype.drawDevice = function(){
		if(this.config.displayDevice){
			this.drawDeviceMarkers()
			this.drawDeviceMarkerLine()
		}
	}

	Monitor.prototype.drawDeviceMarkers = function(){
		var deviceMarkers = this.getDeviceMarkers()
		var monitor = this
		Object.keys(deviceMarkers).forEach(function(time){
			monitor.drawPointers(time, deviceMarkers[time])
		})
	}	

	Monitor.prototype.drawDeviceMarkerLine = function(){
		var x0 = TM.TimelineRuler.barStart
		var y0 = this.timeline.ruler.markerLinePos()
		var x1 = 50.0
		this.canvas.drawLine("white", x0, y0, x1, y0)
	}

	Monitor.prototype.getDeviceMarkers = function(){
		var deviceMarkers = {}
		var monitor = this
		var startTime = this.timeline.startTime()
		for(var i = startTime; i < this.timeline.time; i++){
			this.timeline.rings.forEach(function(ring){
				var index = ring.realIndex[i]
				if(index && index.marker){
					var marker = monitor.profile.markers[index.marker]
					deviceMarkers[i] = (deviceMarkers[i] || [])
					marker.type == "timeline" && deviceMarkers[i].push(marker)
				}
			})
		}
		return deviceMarkers
	}

	Monitor.prototype.drawPointers = function(time, pointers){
		for(var i = pointers.length - 1; i >= 0 ; i--){
			var pointer = pointers[i]
			var xPos = this.timeline.ruler.xPos(time)
			var y0 = this.timeline.ringHeight() / 20
			var y1 = this.timeline.ruler.markerLinePos()
			y1 = y1 + (i * 2 - 1) * this.timeline.pointerRadius()
			var grad = pointer.gradient
			new TM.Pointer(pointer.color, xPos, y0, y1, grad, this.timeline).draw()
		}
	}

	Monitor.prototype.drawPreData = function(){
		if(this.config.displayRing){
			var monitor = this
			this.timeline.rings.forEach(function(ring){
				new TM.PreDataPaint(ring, monitor.profile).draw()
			})
		}
	}

	Monitor.prototype.drawRealData = function(){
		if(this.config.displayRing){
			var monitor = this
			this.timeline.rings.forEach(function(ring){
				new TM.RealDataPaint(ring, monitor.profile).draw()
			})
		}
	}

	Monitor.prototype.drawCenterLine = function(){
		if(this.config.displayDevice){
			var y1 = 100 - this.timeline.ringHeight() * 0.5
			canvas.drawLine("white", 50.0, 0.0, 50.0, y1)
		}
	}
})()

