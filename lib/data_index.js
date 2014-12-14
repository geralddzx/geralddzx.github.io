(function (){
	var DataIndex = TM.DataIndex = function(parent){
		this.parent = parent
		this.data = {}
	}

	DataIndex.prototype.addRealData = function(time, data){
		this.realData[time] = data
	}

	DataIndex.prototype.drawDataRange = function(start, end){
		for(var i = start; i < end; i++){
			var data = this.realData[i]
			data && this.drawData(i - start, data)
		}
	}

	DataIndex.prototype.drawData = function(index, data){
		var rings = data.rings.keys()
		for(var i = 0; i < rings.length; i++){
			var ring = this.timeline.getRing(rings[i])
			var ringData = data.rings[rings[i]]
			if (ringData.phase){
				this.drawRingData(ring, index, ringData)
			}
		}
	}

	DataIndex.prototype.drawRingData = function(ring, index, data){
		var startX = canvas.getX(ring.realBarPos()[0] + index * this.timeline.dataWidth())
		var width = canvas.getX(this.timeline.dataWidth())
		var startY = canvas.getY(ring.realBarPos()[1])
		var height = canvas.getY(ring.barHeight())				
		ctx.fillStyle = data.state
		ctx.fillRect(startX, startY, width, height)
	}



})()

