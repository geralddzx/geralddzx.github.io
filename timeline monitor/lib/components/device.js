(function (){
	var Device = TM.Device = function(number, timeline){
		this.timeline = timeline
		this.generator = timeline.gmGenerator

		this.number = number
		this.id = timeline.intersectionID + number
		this.name = TM.Names.rand()
		this.controlMode = "CC"		
	}

	Device.genDevices = function(timeline){
		timeline.devices = []
		var numDevices = Math.randInt(1,20)
		for(var i = 0; i < numDevices; i++){
			timeline.devices.push(new Device(i, timeline))
		}
	}

	Device.prototype.genData = function(){
		this.generator.genData()
	}

	Device.prototype.currentStatus = function(){
		var data = this.dataIndex[this.timeline.time - 1]
		return data && data.status
	}
})()

