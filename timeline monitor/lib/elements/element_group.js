(function (){
	var ElementGroup = TM.ElementGroup = function(xOffset, yOffset, spacing, h, v, width, height, parent){
		this.elements = []
		this.xOffset = xOffset
		this.yOffset = yOffset
		this.spacing = spacing
		this.h = h
		this.v = v
		this._width = width
		this._height = height
		this.parent = parent
	}

	ElementGroup.prototype.add = function(button){
		this.elements.push(button)
	}

	ElementGroup.prototype.pos = function(){
		var x = this.parent.xPos() + this.xOffset * this.parent.width()
		var y = this.parent.yPos() + this.yOffset * this.parent.height()
		return [x, y]
	}

	ElementGroup.prototype.startPos = function(index){
		x = this.pos()[0]
		y = this.pos()[1]
		var width = this.width() + this.spacing * this.parent.width()
		var height = this.height() + this.spacing * this.parent.height()
		for(var i = 0; i < index; i++){
			this.h && width && (x += width)
			this.v && height && (y += height)
		}
		return [x, y]
	}

	ElementGroup.prototype.width = function(){
		return this._width * this.parent.width()
	}

	ElementGroup.prototype.height = function(){
		return this._height * this.parent.height()
	}

	ElementGroup.prototype.reset = function(){
		for(var i = 0; i < this.elements.length; i++){
			var element = this.elements[i]
			var pos = this.startPos(i)
			element.resetPosition(pos[0], pos[1])
			element.resetDimension(this.width(), this.height())
			$('body').append($(element.element))
		}
	}

	ElementGroup.prototype.hide = function(){
		for(var i = 0; i < this.elements.length; i++){
			this.elements[i].hide()
		}
	}

	ElementGroup.prototype.show = function(){
		for(var i = 0; i < this.elements.length; i++){
			this.elements[i].show()
		}
	}

})()