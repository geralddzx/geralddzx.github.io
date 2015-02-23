(function (){
	var SizeControl = TM.SizeControl = function(monitor){
		this.monitor = monitor
		this.timeline = monitor.timeline
		this.pos = [0, 101]
		this.makeButtons()
	}

	SizeControl.prototype.makeButtons = function(){
		this.buttonGroup = new TM.ElementGroup(this.pos[0], this.pos[1], 1, true)
		this.buttonGroup.add(this.makeFull())
		this.buttonGroup.add(this.makeTop())
		this.buttonGroup.add(this.makeTopLeft())
	}

	SizeControl.prototype.makeFull = function(){
		var btn = new TM.Button(this, "Full", Width, Height)
		var control = this
		$(btn.element).click(function(){
			control.resetCanvas(1080, 540)
		})
		return btn
	}

	SizeControl.prototype.makeTop = function(){
		var btn = new TM.Button(this, "Top", Width, Height)
		var control = this
		$(btn.element).click(function(){
			control.resetCanvas(1080, 270)
		})
		return btn
	}

	SizeControl.prototype.makeTopLeft = function(){
		var btn = new TM.Button(this, "Top Left", Width * 2, Height)
		var control = this
		$(btn.element).click(function(){
			control.resetCanvas(540, 270)
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
