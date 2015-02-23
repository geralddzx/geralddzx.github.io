(function (){
	var Scroll = TM.Scroll = function(monitor){
		this.monitor = monitor
		this.timeline = monitor.timeline
		this.canvas = monitor.canvas
		this.startHandler()
		this.scroll = false
	}

	Scroll.prototype.draw = function(){
		this.drawBar()
		this.drawLabels()
		this.drawPointer()
	}

	Scroll.prototype.yPos = function(){
		return 100 - this.timeline.ringHeight() * 0.4
	}

	Scroll.prototype.height = function(){
		return this.timeline.ringHeight() * 0.2
	}

	Scroll.prototype.drawBar = function(){
		var x0 = Scroll.x0
		var y0 = this.yPos()
		var width = Scroll.barWidth
		var height = this.height()
		canvas.fillRect(Scroll.barColor, x0, y0, width, height)
	}

	Scroll.prototype.drawLabels = function(){
		var segments = Scroll.hourSegments
		for(var i = 1; i < 24 * segments; i++){
			if(i % segments == 0){
				this.drawHour(i / segments)
			} else {
				this.drawLine(i)
			}
		}
	}

	Scroll.prototype.drawLine = function(x){
		var x0 = x / (24.0 * Scroll.hourSegments) * Scroll.barWidth + Scroll.x0
		var y0 = this.yPos() + this.height() * 0.3
		var y1 = y0 + this.height() * 0.4
		canvas.drawLine("black", x0, y0, x0, y1)
	}

	Scroll.prototype.drawHour = function(hour){
		var x = hour / 24.0 * Scroll.barWidth + Scroll.x0
		var y = this.yPos() + this.height() * 0.5
		var height = this.height() * 0.5
		canvas.fillText("black", height, hour, x, y, "center", "middle")
	}

	Scroll.prototype.drawPointer = function(){
		var x0 = this.xPos()
		var y0 = this.yPos() - this.height() * 0.3
		var y1 = this.yPos() + this.height()
		var color = this.monitor.profile.scrollColor
		new TM.Pointer(color, x0, y0,  y1, null, this.timeline).draw()
	}

	Scroll.prototype.xPos = function(){
		var start = this.timeline.dayStart()
		var time = this.timeline.time - start
		return time / 86400 * Scroll.barWidth + Scroll.x0
	}

	Scroll.prototype.startHandler = function(){
		this.bindMouseDown()
		this.bindMouseUp()
		this.bindMouseMove()
	}

	Scroll.prototype.bindMouseDown = function(){
		var canvas = $(this.canvas.element)
		var callback = function(event){
			if(this.checkClick(event.offsetX, event.offsetY)){
				this.scroll = true
			}
		}
		canvas.mousedown(callback.bind(this))
	}

	Scroll.prototype.bindMouseUp = function(){
		var callback = function(event){
			this.scroll = false
		}
		$(window).mouseup(callback.bind(this))
	}

	Scroll.prototype.bindMouseMove = function(){
		var canvas = $(this.canvas.element)
		var callback = function(event){
			if(this.scroll){
				var time = this.getTime(event.offsetX)
				this.timeline.time = this.timeline.dayStart() + time
				this.monitor.draw()
				time == 86400 && (this.scroll = false)
				time + this.timeline.forward < 0 && (this.timeline.forward = 0)
			}
		}
		canvas.mousemove(callback.bind(this))
	}

	Scroll.prototype.checkClick = function(x0, y0){
		var x1 = this.xPos()
		x1 = this.canvas.getX(x1)
		var radius = this.canvas.getY(this.timeline.pointerRadius())
		var y1 = this.canvas.getY(this.yPos() + this.height()) + radius
		var distance = Math.distance(x0, y0, x1, y1)
		return distance < radius
	}

	Scroll.prototype.getTime = function(x){
		var xPos = this.canvas.percentX(x)
		var proportion = (xPos - Scroll.x0) / Scroll.barWidth
		proportion = Math.bound(proportion, 0, 1)
		return Math.floor(proportion * 86400)
	}

	Scroll.x0 = 5.0
	Scroll.barWidth = 90.0
	Scroll.barColor = "#FFFFFF"
	Scroll.hourSegments = 2
		
})()