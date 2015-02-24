Canvas = function(width, height){
	this.element = $('<canvas>')[0]
	this.ctx = this.element.getContext("2d")
	this.width(width)
	this.height(height)
	$('#canvas').append($(this.element))
	this.preventTextCursor()
}

Canvas.prototype.preventTextCursor = function(){
	$(this.element).mousedown(function(event){	
		event.originalEvent.preventDefault()
	})
}

Canvas.prototype.fillRect = function(color, x1, y1, width, height, stroke){
	var ctx = this.ctx 
	ctx.beginPath()
	ctx.rect(this.getX(x1), this.getY(y1), this.getX(width), this.getY(height))
	ctx.fillStyle = color
	ctx.fill()
	if(stroke){
		ctx.strokeStyle = stroke
		ctx.stroke()
	}
}

Canvas.prototype.fillText = function(color, height, text, x, y, align, valign){
	var ctx = this.ctx 
	size = this.getY(height) / 1.618
	ctx.font = size + 'pt sans-serif'
	ctx.fillStyle = color
	ctx.textAlign = align
	ctx.textBaseline = valign
	ctx.fillText(text, this.getX(x), this.getY(y))
}

Canvas.prototype.fillCircle = function(fillStyle, x0, y0, radius){
	var x = this.getX(x0)
	var y = this.getY(y0)
	var r = this.getY(radius)
	this.ctx.beginPath()
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false)
    this.ctx.fillStyle = fillStyle
    this.ctx.fill()
}

Canvas.prototype.drawLine = function(color, x0, y0, x1, y1){
	var ctx = this.ctx
	ctx.strokeStyle = color
	ctx.beginPath()
    ctx.moveTo(this.getX(x0), this.getY(y0))
    ctx.lineTo(this.getX(x1), this.getY(y1))
    ctx.stroke()
}

Canvas.prototype.circleGradient = function(color1, color2, x, y, r1, r2){
	var x = this.getX(x)
	var y = this.getY(y)
	var r1 = this.getY(r1)
	var r2 = this.getY(r2)
	var grd = this.ctx.createRadialGradient(x, y, r1, x, y, r2)
	grd.addColorStop(0, color1)
	grd.addColorStop(1, color2)
	return grd
}

Canvas.prototype.getX = function(percent){
	return this.width() * percent / 100
}

Canvas.prototype.getY = function(percent){
	return this.height() * percent / 100
}

Canvas.prototype.percentX = function(x){
	return x / this.width() * 100
}

Canvas.prototype.percentY = function(y){
	return y / this.height() * 100
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

Canvas.prototype.offset = function(){
	var offset = $(this.element).offset()
	return [offset.left, offset.top]
}