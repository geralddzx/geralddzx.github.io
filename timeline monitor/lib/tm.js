Fortran = {}
Fortran.profile = {
	allRed: "ff0000",
	flashDW: "ffa500",
	forceOff: "ffff00",
	forced: "ff0000",
	holOn: "ffffff",
	noRes: "d3d3d3",
	omitPhase: "d3d3d3",
	permPer: "c79cf0",
	phaseGreen: "00ff00",
	phaseWalk: "ffffff",
	specFunc: "00ff00",
	tspOff: "ffa500",
	tspOn: "ffcc00",
	yellowClear: "ffff00",
	yieldOff: "0000ff",
	yieldOn: "add8e6",
}

var timeline = new TM.Timeline()
var monitor = new TM.Monitor(timeline, new TM.Profile(Fortran.profile))

resize = function(x, y){
	if(window.monitor){
		monitor.canvas.width(x)
		monitor.canvas.height(y)
		monitor.draw()
	}
}
