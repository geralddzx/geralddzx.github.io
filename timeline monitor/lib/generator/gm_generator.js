(function(){
	var GmGenerator = TM.GmGenerator = function(device){
		this.index = device.dataIndex = {}
		this.device = device
		this.timeline = device.timeline
		device.generator = this
	}

	GmGenerator.inherits(TM.Generator)

	GmGenerator.prototype.genData = function(){
		var time = this.timeline.time -1
		if(!this.index[time] && time < Date.nowInSeconds()){
			var data = {}
			data.status = ['g', 'y', 'r'].rand()
			this.index[time] = data
		}
	}

	GmGenerator.buildGenerators = function(timeline){
		timeline.devices.forEach(function(device){
			new GmGenerator(device)
		})
	}
})()