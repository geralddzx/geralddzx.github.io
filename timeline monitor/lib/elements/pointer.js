(function (){
	var Pointer = TM.Pointer = function(color, xPos, y0, y1, gradient, timeline){
		this.color = color
		this.xPos = xPos
		this.y0 = y0
		this.y1 = y1
		this.gradient = !!gradient
		this.timeline = timeline
	}

	Pointer.prototype.draw = function(){
		this.drawLine()
		this.drawOrb()
	}
	
	Pointer.prototype.drawLine = function(){
		canvas.drawLine(this.color, this.xPos, this.y0, this.xPos, this.y1)
	}

	Pointer.prototype.drawOrb = function(){
		var r = this.timeline.pointerRadius()
		var xPos = this.xPos
		var yPos = this.y1 + r
		var fill = this.color
		var grd = canvas.circleGradient("white", fill, xPos, yPos, r / 5, r)
		this.gradient && (fill = grd)
		canvas.fillCircle(fill, xPos, yPos, r)
	}
		
})()