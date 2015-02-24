(function() {
    var Timeline = TM.Timeline = function() {
        this.time = Date.nowInSeconds()
        this.forward = 1
        this.zoom = 100
        this.widgets = []

        this.ruler = new TM.TimelineRuler(this)
        this.newIntersection()
        this.start()
    }

    Timeline.prototype.newIntersection = function() {
        this.cycleTime = Math.randInt(100, 120)
        this.intersectionID = Math.randInt(1, 200)
        this.intersectionMode = Math.randInt(1, 10)
        this.randStart = Math.randInt(this.time - 80, this.time)

        TM.Ring.genRings(this)
        TM.Detector.genDetectors(this)
        TM.Device.genDevices(this)
        this.buildGenerators()
        this.drawWidgets()
    }

    Timeline.prototype.buildGenerators = function() {
        TM.PreGenerator.buildGenerators(this)
        TM.RealGenerator.buildGenerators(this)
        TM.DetGenerator.buildGenerators(this)
        TM.GmGenerator.buildGenerators(this)
        this.genData()
    }

    Timeline.prototype.start = function() {
        this.genData()
        setInterval(this.step.bind(this), 1000)
    }

    Timeline.prototype.step = function() {
        this.time = this.time + this.forward
        this.genData()
        this.drawWidgets()
    }

    ////////  Real-time Updates  //////////
    Timeline.prototype.update = function(d) {
        this.time = this.time + this.forward;
        this.updateData(d);
        this.drawWidgets();
    };
    ////////  Real-time Updates  //////////

    Timeline.prototype.drawWidgets = function() {
        this.widgets.forEach(function(widget) {
            widget.draw()
        })
    }

    Timeline.prototype.genData = function() {
        this.rings.forEach(function(ring) {
            ring.genData()
        })
        this.detectors.forEach(function(detector) {
            detector.genData()
        })
        this.devices.forEach(function(device) {
            device.genData()
        })
    }

    Timeline.prototype.allDeviceIDs = function() {
        var ids = []
        this.devices.forEach(function(device) {
            ids.push(device["Device ID"])
        })
        return ids
    }

    Timeline.prototype.scheduleRepeat = function(ids, time) {
        ids = ids || this.allDeviceIDs()
        time = time || this.time - 1
        var data = {}
        data.iidSuccess = []
        data.iidFail = []
        devices = this.getDevices(ids)
        devices.forEach(function(device) {
            if (device.dataIndex[time].error) {
                data.iidFail.push(device["Device ID"])
            } else {
                data.iidSuccess.push(device["Device ID"])
            }
        })
        return data

    }

    Timeline.prototype.getDevices = function(ids) {
        ids = ids || []
        return TM.Util.findByElement(this.devices, function(element) {
            return ids.indexOf(element["Device ID"]) >= 0
        })
    }


    Timeline.prototype.displaySize = function() {
        return Math.round(Timeline.displaySize * 100 / this.zoom)
    }

    Timeline.prototype.startTime = function() {
        return this.time - this.displaySize()
    }

    Timeline.prototype.endTime = function() {
        return this.time + this.displaySize()
    }

    Timeline.prototype.ringHeight = function() {
        return 100.0 / (this.rings.length + 1)
    }

    Timeline.prototype.dayStart = function() {
        return this.currentDay().getTime() / 1000
    }

    Timeline.prototype.currentDay = function() {
        var date = new Date(this.time * 1000)
        date.setHours(0, 0, 0, 0)
        return date
    }

    Timeline.prototype.pointerRadius = function() {
        return this.ringHeight() * 0.05
    }

    Timeline.prototype.currentDetData = function() {
        var data = {}
        this.detectors.forEach(function(detector) {
            data[detector.name] = detector.currentData()
        })
        return data
    }

    Timeline.prototype.goto = function(time) {
        time = time.split(":")
        var hour = parseInt(time[0])
        var minute = parseInt(time[1])
        var date = this.currentDay()
        date.setHours(hour, minute, 0, 0)
        this.time = date.getTime() / 1000
    }

    Timeline.prototype.currentGmData = function() {
        time = time.split(":")
        var hour = parseInt(time[0])
        var minute = parseInt(time[1])
        var date = this.currentDay()
        date.setHours(hour, minute, 0, 0)
        this.time = date.getTime() / 1000
    }

    Timeline.prototype.findCycleStart = function(time) {
        for (var i = 0; i < this.rings.length; i++) {
            var start = this.rings[i].findCycleStart(time)
            if (start) {
                return start
            }
        }
        return false
    }

    Timeline.prototype.findCycleStarts = function() {
        var data = {}
        this.rings.forEach(function(ring) {
            ring.findCycleStarts(data)
        })
        return Object.keys(data)
    }

    Timeline.prototype.getRealData = function(time) {
        for (var i = 0; i < this.rings.length; i++) {
            var index = this.rings[i].realIndex
            if (index && index[time]) {
                return index[time]
            }
        }
        return false
    }

    Timeline.displaySize = 100

    Timeline.states = ["green", "amber", "red", "walk", "dw", "pp"]
})()