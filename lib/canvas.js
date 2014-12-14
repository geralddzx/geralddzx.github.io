Canvas = function(canvas){
	this.element = canvas
	this.width(canvas.width)
	this.height(canvas.height)
	this.ctx = this.element.getContext("2d")
}

Canvas.prototype.fillRect = function(color, x1, y1, width, height){
	var ctx = this.ctx 
	ctx.fillStyle = color
	ctx.fillRect(this.getX(x1), this.getY(y1), this.getX(width), this.getY(height))
}

Canvas.prototype.fillText = function(color, size, text, startX, startY){
	var ctx = this.ctx 
	size = Math.max(this.height() / 100.0 * size, 6)
	ctx.font = size + 'pt sans-serif'
	ctx.fillStyle = color
	ctx.textBaseline = "top"
	ctx.fillText(text, this.getX(startX), this.getY(startY))
}

Canvas.prototype.drawLine = function(color, x0, y0, x1, y1){
	ctx.strokeStyle = color
	ctx.beginPath()
    ctx.moveTo(this.getX(x0), this.getY(y0))
    ctx.lineTo(this.getX(x1), this.getY(y1))
    ctx.stroke()
}

Canvas.prototype.getX = function(percent){
	return this.width() * percent / 100
}

Canvas.prototype.getY = function(percent){
	return this.height() * percent / 100
}

Canvas.prototype.getMargin = function(percent){
	var pixels = $(this.element).css("margin")
	return parseInt(pixels.slice(0, pixels.length - 2))
}

Canvas.prototype.width = function(x){
	if (x){
		this.element.width = x
	}
	return this.element.width
}

Canvas.prototype.height = function(y){
	if (y){
		this.element.height = y
	}
	return this.element.height
}