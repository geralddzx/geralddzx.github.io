(function (){
	var SizeControl = TM.SizeControl = function(monitor){
		this.monitor = monitor
		this.timeline = monitor.timeline
		this.pos = [0, 1.01]
		this.makeButtons()
	}

	SizeControl.prototype.makeButtons = function(){
		this.buttonGroup = new TM.ElementGroup(this.pos[0], this.pos[1], 0.01, true, false, 0.1, 0.2, this.monitor.control)
		this.buttonGroup.add(this.makeTop())
		this.buttonGroup.add(this.makeTopLeft())
		this.buttonGroup.add(this.makeFull())
	}

	SizeControl.prototype.makeTop = function(){
		var monitor = this.monitor
		var btn = new TM.Button("Top")
		$(btn.element).click(function(){
			monitor.canvas.width(1080)
			monitor.canvas.height(270)
			monitor.draw()
		})
		return btn
	}

	SizeControl.prototype.makeFull = function(){
		var monitor = this.monitor
		var btn = new TM.Button("Full")
		$(btn.element).click(function(){
			monitor.canvas.width(1080)
			monitor.canvas.height(540)
			monitor.draw()
		})
		return btn
	}

	SizeControl.prototype.makeTopLeft = function(){
		var monitor = this.monitor
		var btn = new TM.Button("Top Left")
		$(btn.element).click(function(){
			monitor.canvas.width(540)
			monitor.canvas.height(270)
			monitor.draw()
		})
		return btn
	}

	SizeControl.prototype.resetCanvas = function(x, y){
		canvas.width(x)
		canvas.height(y)
		this.monitor.draw()
	}

	var Width = SizeControl.width = 6
	var Height = SizeControl.height = 6
})()
