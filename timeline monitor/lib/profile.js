(function(){
	var Profile = TM.Profile = function(profile){
		this.profile = profile
		this.scrollColor = "#FF0066"
		this.markers = Profile.genMarkers()
	}

	Profile.genMarkers = function(){
		var markers = []
		for (var i = 1; i < 30; i++){
			var marker = {}
			marker.color = TM.Colors[Math.randInt(0, TM.Colors.length)]
			marker.gradient = true
			marker.type = Profile.markerTypes.rand()
			markers.push(marker)
		}
		return markers
	}

	Profile.prototype.lightColors = function(state){
		var colorKey = Profile.colorKey[state]
		return "#" + this.profile[colorKey]
	}

	Profile.colorKey = {
		green: "phaseGreen",
		red: "allRed",
		amber: "yellowClear",
		walk: "phaseWalk",
		pp: "permPer",
		dw: "flashDW",
	}

	Profile.markerTypes = [
		"phase", "ring", "timeline"
	]
})()





