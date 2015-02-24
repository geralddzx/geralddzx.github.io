(function (){
	var Control = TM.Control = function(monitor){
		this.monitor = 	monitor
		this.timeline = monitor.timeline
		this.buildZoom()
	}

	Control.prototype.height = function(){
		return this.timeline.ringHeight()
	}
		
	Control.prototype.yPos = function(){
		return 100 - this.height()
	}

	Control.prototype.xPos = function(){
		return 0
	}
	
	Control.prototype.width = function(){
		return 100
	}

	Control.prototype.buildZoom = function(){
		this.zoomButtons = new TM.ElementGroup(0.005, 0.2, 0.075, false, true, 0.035, 0.2, this)
		this.zoomButtons.add(this.buildZoomIn())
		this.zoomButtons.add(this.buildZoomOut())
		this.zoomButtons.add(this.buildNormalZoom())
	}

	Control.prototype.buildZoomIn = function(){
		var btn = new TM.Button("+")
		var control = this
		$(btn.element).click(function(){
			var zoom = control.timeline.zoom
			var newZoom = Math.max(Math.round(zoom * 1.2), zoom + 10)
			control.timeline.zoom = Math.min(newZoom, 1000)
			control.monitor.draw()
		})
		return btn
	}

	Control.prototype.buildZoomOut = function(){
		var btn = new TM.Button("-")
		var control = this
		$(btn.element).click(function(){
			var zoom = control.timeline.zoom
			var newZoom = Math.min(Math.round(zoom * 0.8), zoom - 10) 
			control.timeline.zoom = Math.max(newZoom, 40)
			control.monitor.draw()
		})
		return btn
	}

	Control.prototype.buildNormalZoom = function(){
		var btn = new TM.Button("1:1")
		var control = this
		$(btn.element).click(function(){
			control.timeline.zoom = 100
			control.monitor.draw()
		})
		return btn
	}

	Control.prototype.draw = function(){
		this.zoomButtons.reset()
	}

})()