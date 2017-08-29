// Simple arg paring
module.exports = function parseArgs(args) {
	var argCount = args.length
	var nodePath = args[0]
	var scriptName = args[1].split("/").slice(-1).pop()
	var optionCount = argCount > 2 ? argCount - 2 : 0;

	console.log("Script Name:", scriptName)
	console.log("Option Count:", optionCount)
}
