(function (){
	var Config = TM.Config = function(monitor){
		this.monitor = monitor
		this.timeline = monitor.timeline
		this.canvas = this.monitor.canvas
		this.initCoords()
		this.initSettings()
		
		this.button = this.makeButton()
		this.exit = this.makeExit()
		this.makeLabels()
		this.startHandler()
	}

	Config.prototype.initCoords = function(){
		this._width = 20
		this._height = 50
		this.pos = [99.5 - this.width(), this.yBound()]
	}

	Config.prototype.width = function(){
		return this._width
	}

	Config.prototype.height = function(){
		return this._height
	}

	Config.prototype.xPos = function(){
		return this.pos[0]
	}

	Config.prototype.yPos = function(){
		return this.pos[1]
	}

	Config.prototype.initSettings = function(){
		this.display = 0
		this.displayRing = true
		this.displayDevice = true
		this.displayPhase = true
		this.displayTimeline = true
	}

	Config.prototype.makeLabels = function(){
		var xSpace = this.width / 10
		var ySpace = this.height / 20
		this.labelGroup = new TM.ElementGroup(0.1, 0.1, 0.05, false, true, NaN, 0.1, this)
		this.labelGroup.add(this.makeDisplay("Device"))
		this.labelGroup.add(this.makeDisplay("Ring"))
		this.labelGroup.add(this.makeDisplay("Phase"))
		this.labelGroup.add(this.makeDisplay("Timeline"))
	}

	Config.prototype.makeDisplay = function(component){
		var checkbox = new TM.Checkbox(component, this.canvas)
		var config = this
		$(checkbox.box).change(function(){
			if($(this).prop('checked')){
				config["display" + component] = true
			} else {
				config["display" + component] = false
			}
			config.monitor.draw()
		})
		return checkbox
	}


	Config.prototype.makeButton = function(){
		var container = new TM.ElementGroup(0.96, 0.04, 0, false, false, 0.03, 0.2, this.monitor.control)
		var btn = new TM.Button("⚙", this.canvas)
		var config = this
		$(btn.element).click(function(){
			if(config.display){
				config.hide()
			} else {
				config.show()
			}
		})
		container.add(btn)
		return container
	}

	Config.prototype.makeExit = function(){
		var container = new TM.ElementGroup(0.9, 0, 0, false, false, 0.1, 0.075, this)
		var btn = new TM.Button("×")
		var config = this
		$(btn.element).click(function(){config.hide()})
		container.add(btn)
		return container
	}

	Config.prototype.show = function(){
		this.display = 1
		this.labelGroup.show()
		this.exit.show()
		this.monitor.draw()
	}

	Config.prototype.hide = function(){
		this.display = 0
		this.labelGroup.hide()
		this.exit.hide()
		this.monitor.draw()
	}

	Config.prototype.buttonHeight = function(){
		return this.monitor.timeline.ringHeight() / 5
	}

	Config.prototype.draw = function(){
		this.shift(0, 0)
		this.button.reset()
		if(this.display){
			this.labelGroup.reset()
			this.exit.reset()
			this.drawContainer()
		}
	}

	Config.prototype.drawContainer = function(){
		var x = this.pos[0]
		var y = this.pos[1]
		var w = this.width()
		var h = this.height()
		this.canvas.fillRect("black", x, y, w, h, "white")
	}

	Config.prototype.startHandler = function(){
		this.bindMouseDown()
		this.bindMouseUp()
		this.bindMouseMove()
	}

	Config.prototype.checkClick = function(x0, y0){
		if(this.display){
			x0 = this.canvas.percentX(x0)
			y0 = this.canvas.percentY(y0)
			var withinX = Math.between(x0, this.pos[0], this.pos[0] + this.width())
			var withinY = Math.between(y0, this.pos[1], this.pos[1] + this.height())
			return withinX && withinY
		}
	}

	Config.prototype.bindMouseDown = function(){
		var canvas = $(this.canvas.element)
		var callback = function(event){
			if(this.checkClick(event.offsetX, event.offsetY)){
				this.move = true
				this.xStart = event.clientX
				this.yStart = event.clientY
			}
		}
		canvas.mousedown(callback.bind(this))
	}

	Config.prototype.bindMouseUp = function(){
		var callback = function(event){
			this.move = false
		}
		$(window).mouseup(callback.bind(this))
	}

	Config.prototype.bindMouseMove = function(){
		var config = this
		var callback = function(event){
			if(this.move){
				var xShift = this.canvas.percentX(event.clientX - this.xStart)
				var yShift = this.canvas.percentY(event.clientY - this.yStart)
				this.shift(xShift, yShift)
				this.xStart = event.clientX
				this.yStart = event.clientY
				config.monitor.draw()
			}
		}
		$(window).mousemove(callback.bind(this))
	}

	Config.prototype.shift = function(xShift, yShift){
		var xBound = 100 - this.width()
		this.pos[0] = Math.bound(this.pos[0] + xShift, 0, xBound)
		this.pos[1] = Math.bound(this.pos[1] + yShift, 0, this.yBound())
	}

	Config.prototype.yBound = function(){
		return 100 - this.timeline.ringHeight() - this.height()
	}


})()