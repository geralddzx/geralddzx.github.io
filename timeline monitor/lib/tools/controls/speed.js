(function (){
	var SpeedControl = TM.SpeedControl = function(monitor){
		this.monitor = monitor
		this.timeline = monitor.timeline
		this.makeButtons()
	}

	SpeedControl.prototype.makeButtons = function(){
		this.buttonGroup = new TM.ElementGroup(0.66, 0.3, 0.01, true, false, 0.05, 0.2, this.monitor.control)
		this.buttonGroup.add(this.makeDoubleRewind())
		this.buttonGroup.add(this.makeRewind())
		this.buttonGroup.add(this.makePausePlay())
		this.buttonGroup.add(this.makeForward())
		this.buttonGroup.add(this.makeDoubleForward())
	}

	SpeedControl.prototype.makeDoubleRewind = function(){
		var btn = new TM.Button("<<")
		$(btn.element).click(this.doubleRewind.bind(this))
		return btn
	}

	SpeedControl.prototype.makeRewind = function(){
		var timeline = this.timeline
		var btn = new TM.Button("<")
		$(btn.element).click(function(){timeline.forward = -1})
		return btn
	}

	SpeedControl.prototype.makePausePlay = function(){
		var btn = new TM.Button("⧐")
		$(btn.element).click(this.pausePlay.bind(this))
		return btn
	}

	SpeedControl.prototype.makeForward = function(){
		var btn = new TM.Button(">")
		var timeline = this.timeline
		$(btn.element).click(function(){timeline.forward = 1})
		return btn
	}

	SpeedControl.prototype.makeDoubleForward = function(){
		var btn = new TM.Button(">>")
		$(btn.element).click(this.doubleForward.bind(this))
		return btn
	}

	SpeedControl.prototype.pausePlay = function(){
		if(this.timeline.forward){
			this.timeline.forward = 0
		} else {
			this.timeline.forward = 1
		}
	}

	SpeedControl.prototype.doubleRewind = function(){
		var timeline = this.timeline
		if(timeline.forward > -2){
			timeline.forward = -2
		} else {
			timeline.forward = Math.max(-32, timeline.forward * 2)
		}
	}

	SpeedControl.prototype.doubleForward = function(){
		var timeline = this.timeline
		if(timeline.forward < 2){
			timeline.forward = 2
		} else {
			timeline.forward = Math.min(32, timeline.forward * 2)
		}
	}

	SpeedControl.prototype.height = function(){
		return this.timeline.ringHeight() / 5
	}

	var Width = SpeedControl.buttonWidth = 4
})()
