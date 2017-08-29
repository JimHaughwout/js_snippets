var fs = require('fs');


function readWords(file) {
	var x = fs.readFileSync(file).toString();
	x = x.replace(/\r?\n/g, " ");
	//x = x.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
	x = x.split(" ");

	var words = [];
	for (var i = 0; i < x.length; i++) {
		if (x[i] != '') {
			var simplifiedWord = x[i].replace(/[^a-zA-Z]/g, "").toLowerCase()
			words.push(simplifiedWord)
		}

	}
	return words;
}

function removeStopWords(wordList) {
	var stopWords = fs.readFileSync("common-english-stop-words.txt").toString().split(",");
	var list = [];
	for (var i = 0; i < wordList.length; i++) {
		if (stopWords.includes(wordList[i]) != true) {
			list.push(wordList[i]);
		} 
	}
	return list;
}


function countWords(words) {
	var wordDict = {};
	for (var i = 0; i < words.length; i++) {
		if (words[i] in wordDict) {
			wordDict[words[i]]++;
		}
		else {
			wordDict[words[i]] = 1;
		}
	}
	return wordDict;
}


function topWords(wordCounts, topN) {
	// Convert to tuples, like RDDs
	var wordTuples = Object.keys(wordCounts).map(function(key) {
    return [key, wordCounts[key]];
  });

	// Sort Lambda function-style
  wordTuples.sort(function compare(t1, t2) {
  	return t2[1] - t1[1]; // Descending
  })

  // Filter Top N
  wordTuples = wordTuples.slice(0, topN);

  // Convert back to a dict
  resultDict = {}
  for (var i = 0; i < wordTuples.length; i++) {
  	word = wordTuples[i][0];
  	cnt = wordTuples[i][1];
  	resultDict[word] = cnt;
  }
  console.log(resultDict);
}

var wordFile = process.argv.slice(-1).pop();
var words = readWords(wordFile);
words = removeStopWords(words);
var wordCounts = countWords(words);

//console.log("Contents of:", wordFile);
//console.log(words);
//console.log(wordCounts);

var topN = 10;
console.log("Top", topN, "words in", wordFile + ":")
topWords(wordCounts, 10);
