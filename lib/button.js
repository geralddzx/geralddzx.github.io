(function (){
	var Button = TM.Button = function(control, name, x, y, width, height){
		this.control = control
		this.name = name
		this.element = $('<button>' + name + '</button>')[0]
		this.xPos = x
		this.yPos = y
		this.width = width
		this.height = height

		this.resetPosition()
		this.resetDimension()
		$('body').append(this.element)	
	}

	Button.prototype.resetPosition = function(){
		this.element.style.position = "absolute"
		var left = canvas.getX(this.xPos) + canvas.getMargin()
		this.element.style.left = left + 5
		var top = canvas.getY(this.yPos) + this.getHeight() / 2
		this.element.style.top = top + canvas.getMargin() + 5
	}

	Button.prototype.resetDimension = function(){
		var width = this.element.style.width = canvas.getX(this.width)
		var height = this.element.style.height = this.getHeight()
		this.element.style.fontSize = Math.min(width, height) / 2.0
		this.element.style.padding = "0px"
		this.element.style.textAlign = "center"
	}

	Button.prototype.getHeight = function(){
		return Math.max(canvas.getY(this.height), 25)
	}
})()