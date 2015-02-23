(function (){
	var Checkbox = TM.Checkbox = function(text, canvas){
		this.canvas = canvas
		this.createEl(text)
	}

	Checkbox.prototype.createEl = function(text){
		this.element = $('<div>')[0]
		this.element.style.position = "absolute"
		var label = $('<label>' + text + '</label>')
		label.attr("for", text + "-checkbox")
		this.label = label[0]
		this.label.style.color = "white"
		this.label.style.verticalAlign = "middle"

		var box = $('<input type="checkbox"/>')
		box.attr("id", text + "-checkbox")
		this.box = box[0]
		this.box.checked = true
		this.box.style.verticalAlign = "middle"

		$(this.element).append(box)
		$(this.element).append(label)
	}

	Checkbox.prototype.resetPosition = function(x, y){
		var left = this.canvas.getX(x) + this.canvas.offset()[0]
		this.element.style.left = left
		var top = this.canvas.getY(y) + this.canvas.offset()[1]
		this.element.style.top = top	
	}

	Checkbox.prototype.resetDimension = function(x, y){
		var boxSize = this.canvas.getY(y)
		this.box.style.height = boxSize + "px"
		this.box.style.width = boxSize + "px"
		this.label.style.fontSize = this.canvas.getY(y) / 1.618
	}

	Checkbox.prototype.hide = function(){
		$(this.element).hide()
	}

	Checkbox.prototype.show = function(){
		$(this.element).show()
	}

})()