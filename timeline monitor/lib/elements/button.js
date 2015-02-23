(function (){
	var Button = TM.Button = function(name, canvas){
		this.name = name
		this.element = $('<button>' + name + '</button>')[0]
		this.canvas = canvas
	}

	Button.prototype.resetPosition = function(x, y){
		this.element.style.position = "absolute"
		var left = canvas.getX(x) + canvas.offset()[0]
		this.element.style.left = left
		var top = canvas.getY(y) + canvas.offset()[1]
		this.element.style.top = top
	}

	Button.prototype.resetDimension = function(x, y){
		this.element.style.width = canvas.getX(x)
		this.element.style.height = canvas.getY(y)
		this.element.style.fontSize = canvas.getY(y) / 1.618
		this.element.style.padding = "0px"
		this.element.style.textAlign = "center"
	}

	Button.prototype.show = function(){
		$(this.element).show()
	}

	Button.prototype.hide = function(){
		$(this.element).hide()
	}
})()