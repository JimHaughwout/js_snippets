// Sample data
var reads = [{"lat":38.8044,"lng":-77.0922,"ts":"2016-02-09T12:00:00.000Z"},{"lat":38.8033,"lng":-77.0912,"ts":"2016-02-09T12:03:00.000Z"},{"lat":37.5943,"lng":-77.4151,"ts":"2016-02-09T12:06:00.000Z"},{"lat":38.8014,"lng":-77.0602,"ts":"2016-02-09T12:09:00.000Z"},{"lat":38.8055,"lng":-77.0564,"ts":"2016-02-09T12:12:00.000Z"},{"lat":38.8081,"lng":-77.0523,"ts":"2016-02-09T12:15:00.000Z"},{"lat":38.8108,"lng":-77.0491,"ts":"2016-02-09T12:18:00.000Z"},{"lat":38.8137,"lng":-77.0451,"ts":"2016-02-09T12:21:00.000Z"},{"lat":38.8212,"lng":-77.0439,"ts":"2016-02-09T12:24:00.000Z"},{"lat":38.8338,"lng":-77.0451,"ts":"2016-02-09T12:27:00.000Z"},{"lat":38.8447,"lng":-77.049,"ts":"2016-02-09T12:30:00.000Z"},{"lat":38.8525,"lng":-77.0472,"ts":"2016-02-09T12:33:00.000Z"},{"lat":38.8502,"lng":-77.0463,"ts":"2016-02-09T12:36:00.000Z"},{"lat":38.8494,"lng":-77.0418,"ts":"2016-02-09T12:39:00.000Z"}];

// Declares a geolocation change a warp if the delta s / delta t 
// exceeds a threshold value
function isWarp(deltaKm, deltaSeconds) {
	if ((deltaSeconds == 0.0) && (deltaKm > 0.0))
		return true;

	var threshold = 200.0; // 200 kph
	var speed = deltaKm / deltaSeconds * 3600.0;
	if (speed > threshold)
		return true;
	else 
		return false;
}

// Compute deltas between reads
// Dependency: npm install gps-distance
var distance = require('gps-distance');
function computeDeltas(readsArray) {
	var elapsedSeconds = 0.0
	var thisDt = Date.parse(readsArray[0]['ts'])

	var elapsedKm = 0.0
	var thisLat = readsArray[0]['lat']
	var thisLng = readsArray[0]['lng']

	for (var i = 0; i < readsArray.length; i++) {
		var lastDt = thisDt
		var thisDt = Date.parse(reads[i]['ts'])
		var deltaSeconds = (thisDt - lastDt) / 1000.0

		var lastLat = thisLat 
		var latLng = thisLng 
		var thisLat = reads[i]['lat']
		var thisLng = reads[i]['lng']
		var deltaKm = distance(lastLat, latLng, thisLat, thisLng)

		var readIsWarp = isWarp(deltaKm, deltaSeconds)
		readsArray[i]['isWarp'] = readIsWarp
		if (readIsWarp == true) {
			deltaKm = 0.0;
			deltaSeconds = 0.0;
		}

		elapsedKm += deltaKm
		elapsedSeconds += deltaSeconds

		readsArray[i]['deltaKm'] = deltaKm;
		readsArray[i]['elapsedKm'] = elapsedKm;
		readsArray[i]['deltaSeconds'] = deltaSeconds;
		readsArray[i]['elapsedSeconds'] = elapsedSeconds;
	}
	return readsArray
}

console.log(computeDeltas(reads))