(function (){
	var Control = TM.Control = function(timeline){
		this.timeline = timeline
		this.makeButtons()
	}

	Control.prototype.makeButtons = function(){
		this.buttons = []
		this.makeSpeedButtons()
		this.makeSizeButtons()
	}

	Control.prototype.yPos = function(){
		return 100 - this.timeline.height()
	}

	Control.prototype.makeSpeedButtons = function(){
		this.buttons.push(this.makeRewind())
		this.buttons.push(this.makeDoubleRewind())
		this.buttons.push(this.makePause())
		this.buttons.push(this.makeForward())
		this.buttons.push(this.makeDoubleForward())
	}

	Control.prototype.makeSizeButtons = function(){
		this.makeFullButton()
		this.makeLeftButton()
		this.makeTopButton()
	}

	Control.prototype.makeFullButton = function(){
		var btn = new TM.Button(this, "Full", 1, 100.0, 10, 5)
		var control = this
		this.buttons.push(btn)

		$(btn.element).click(function(){
			control.resetCanvas(1080, 540)
		})
	}

	Control.prototype.makeTopButton = function(){
		var btn = new TM.Button(this, "Top", 23, 100.0, 10, 5)
		var control = this
		this.buttons.push(btn)

		$(btn.element).click(function(){
			control.resetCanvas(1080, 270)
		})
	}

	Control.prototype.makeLeftButton = function(){
		var btn = new TM.Button(this, "Left", 12, 100.0, 10, 5)
		var control = this
		this.buttons.push(btn)

		$(btn.element).click(function(){
			control.resetCanvas(540, 540)
		})
	}

	Control.prototype.resetCanvas = function(x, y){
		canvas.width(x)
		canvas.height(y)
		this.buttons.each(function(button){
			button.resetPosition()
			button.resetDimension()
		})
		this.timeline.draw()
	}

	// Control.prototype.makeZoom = function(){
	// 	var yPos = this.yPos() + this.timeline.height() / 5
	// 	var btn = new TM.Button(this, "+", 0.0, yPos, 3, 5)
	// 	this.buttons.push(btn)
	// }

	Control.prototype.makeRewind = function(){
		var yPos = this.speedControlPos()
		var timeline = this.timeline
		var btn = new TM.Button(this, "<", 65.0, yPos, 4, 5)
		$(btn.element).click(function(){timeline.forward = -1})
		return btn
	}

	Control.prototype.makeDoubleRewind = function(){
		var yPos = this.speedControlPos()
		var btn = new TM.Button(this, "<<", 60.0, yPos, 4, 5)
		$(btn.element).click(this.doubleRewind.bind(this))
		return btn
	}

	Control.prototype.makePause = function(){
		var yPos = this.speedControlPos()
		var timeline = this.timeline
		var btn = new TM.Button(this, "▷", 70.0, yPos, 4, 5)
		$(btn.element).click(function(){
			if(timeline.forward){
			  timeline.forward = 0
			} else {timeline.forward = 1}
		})
		return btn
	}

	Control.prototype.makeForward = function(){
		var yPos = this.speedControlPos()
		var timeline = this.timeline
		var btn = new TM.Button(this, ">", 75.0, yPos, 4, 5)
		this.buttons.push(btn)
		$(btn.element).click(function(){timeline.forward = 1})
		return btn
	}

	Control.prototype.makeDoubleForward = function(){
		var yPos = this.speedControlPos()
		var timeline = this.timeline
		var btn = new TM.Button(this, ">>", 80.0, yPos, 4, 5)
		this.buttons.push(btn)
		$(btn.element).click(this.doubleForward.bind(this))
		return btn
	}

	Control.prototype.doubleRewind = function(){
		var timeline = this.timeline
		if(timeline.forward > -2){
			timeline.forward = -2
		} else {
			timeline.forward = Math.max(-32, timeline.forward * 2)
		}
	}

	Control.prototype.doubleForward = function(){
		var timeline = this.timeline
		if(timeline.forward < 2){
			timeline.forward = 2
		} else {
			timeline.forward = Math.min(32, timeline.forward * 2)
		}
	}

	Control.prototype.speedControlPos = function(){
		return this.yPos() + this.timeline.height() * 0.3
	}

	
})()