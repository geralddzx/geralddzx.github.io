(function(){
	var PreGenerator = TM.PreGenerator = function(ring){
		this.preIndex = ring.preIndex = {}
		ring.preGenerator = this
		this.constructor._super.call(this, ring)
	}

	PreGenerator.inherits(TM.Generator)

	PreGenerator.buildGenerators = function(timeline){
		timeline.rings.forEach(function(ring){
			new TM.PreGenerator(ring)
		})
	}

	PreGenerator.prototype.genData = function(){
		this.genPreData()
	}

})()