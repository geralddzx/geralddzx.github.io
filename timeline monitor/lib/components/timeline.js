(function (){
	var Timeline = TM.Timeline = function(){
		this.time = Date.nowInSeconds()  - 1
		this.forward = 1
		this.ruler = new TM.TimelineRuler(this)
		this.newIntersection()
		this.zoom = 100
		this.start()
	}

	Timeline.prototype.newIntersection = function(){
		this.intersectionID = Math.randInt(1, 200)
		TM.Ring.genRings(this)
		TM.Detector.genDetectors(this)
		TM.Device.genDevices(this)
		this.buildGenerators()
	}

	Timeline.prototype.buildGenerators = function(){
		TM.PreGenerator.buildGenerators(this)
		TM.RealGenerator.buildGenerators(this)
		TM.DetGenerator.buildGenerators(this)
		TM.GmGenerator.buildGenerators(this)
	}

	Timeline.prototype.start = function(){
		this.genData()
		setInterval(this.step.bind(this), 1000)
	}

	Timeline.prototype.step = function(){
		this.time = this.time + this.forward
		this.genData()
	}

	Timeline.prototype.genData = function(){
		this.rings.forEach(function(ring){
			ring.genData()
		})
		this.detectors.forEach(function(detector){
			detector.genData()
		})
		this.devices.forEach(function(device){
			device.genData()
		})
	}

	Timeline.prototype.displaySize = function(){
		return Timeline.displaySize * 100 / this.zoom
	}

	Timeline.prototype.startTime = function(){
		return this.time - this.displaySize()
	}

	Timeline.prototype.endTime = function(){
		return this.time + this.displaySize()
	}

	Timeline.prototype.ringHeight = function(){
		return 100.0 / (this.rings.length + 1)
	}

	Timeline.prototype.dayStart = function(){
		return this.currentDay().getTime() / 1000
	}

	Timeline.prototype.currentDay = function(){
		var date = new Date(this.time * 1000)
		date.setHours(0, 0, 0, 0)
		return date
	}

	Timeline.prototype.pointerRadius = function(){
		return this.ringHeight() * 0.05
	}

	Timeline.prototype.currentDetData = function(){
		var data = {}
		this.detectors.forEach(function(detector){
			data[detector.name] = detector.currentData()
		})
		return data
	}

	Timeline.prototype.goto = function(time){
		time = time.split(":")
		var hour = parseInt(time[0])
		var minute = parseInt(time[1])
		var date = this.currentDay()
		date.setHours(hour, minute, 0, 0)
		this.time = date.getTime() / 1000
	}

	Timeline.prototype.currentGmData = function(){
		time = time.split(":")
		var hour = parseInt(time[0])
		var minute = parseInt(time[1])
		var date = this.currentDay()
		date.setHours(hour, minute, 0, 0)
		this.time = date.getTime() / 1000
	}

	Timeline.displaySize = 100

	Timeline.states = ["green", "amber", "red", "walk", "dw", "pp"]
})()

