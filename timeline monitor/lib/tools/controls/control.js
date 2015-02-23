(function (){
	var Control = TM.Control = function(monitor){
		this.monitor = 	monitor
		this.timeline = monitor.timeline
	}

	Control.prototype.height = function(){
		return this.timeline.ringHeight()
	}
		
	Control.prototype.yPos = function(){
		return 100 - this.height()
	}

	Control.prototype.xPos = function(){
		return 0
	}
	
	Control.prototype.width = function(){
		return 100
	}

})()