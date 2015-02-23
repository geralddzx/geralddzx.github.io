var canvas = new Canvas($("canvas")[0])
var ctx = canvas.ctx
TM.data = []

var timeline = new TM.Timeline()
TM.Ring.genRings(timeline)
var control = new TM.Control(timeline)

TM.PreGenerator.buildGenerators(timeline)
timeline.start()

