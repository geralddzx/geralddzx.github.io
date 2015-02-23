(function (){
	var Detector = TM.Detector = function(number, timeline){
		this.timeline = timeline
		this.number = number
		this.type = Detector.type.rand()
		this.provider = Detector.provider.rand()
		this.name = this.type.slice(0, 1) + "D " + (number)
		this.id = timeline.intersectionID + "/" + this.number + 1
		this.roadName = TM.Names.rand()
	}

	Detector.genDetectors = function(timeline){
		timeline.detectors = []
		var numDetectors = Math.randInt(1,9)
		for(var i = 0; i < numDetectors; i++){
			timeline.detectors.push(new Detector(i, timeline))
		}
	}

	Detector.prototype.genData = function(){
		this.generator.genData()
	}

	Detector.prototype.currentData = function(){
		var data = []
		var startTime = this.timeline.startTime()
		for(var i = startTime; i < this.timeline.time; i++){
			var indexData = this.dataIndex[i] || {}
			indexData.detector = this
			data.push(indexData)
		}
		return data
	}

	Detector.prototype.currentStatus = function(){
		var status = {}
		status.Vol5min = 0
		status.Occ5min = 0
		var startTime = this.timeline.time - 300
		for(var i = startTime; i < this.timeline.time; i++){
			var indexData = this.dataIndex[i] || {}
			status.Vol5min += this.getVolume(i)
			status.Occ5min += this.getOccupancy(i)
		}
		var currentData = this.dataIndex[this.timeline.time - 1]
		status.status = currentData && currentData.status
		status.failType = currentData && currentData.failType
		return status
	}

	Detector.prototype.getVolume = function(time){
		var data = this.dataIndex[time]
		return data && data.volume || 0 
	}

	Detector.prototype.getOccupancy = function(time){
		var data = this.dataIndex[time]
		return data && data.occupancy || 0 
	}

	Detector.provider = [
		"Citilog",
		"Transit",
		"System",
	]

	Detector.type = [
		"Veh",
		"Ped",
		"TSP",
	]
})()

