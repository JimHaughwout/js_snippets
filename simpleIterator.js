// Simple application of generic function across array

// Our data set. This would normally be streaming
var stooges = [
  {
    "name": "Moe Howard",
    "born": 1897,
    "died": 1975
  },
  {
    "name": "Shemp Howard",
    "born": 1895,
    "died": 1955
  },
  {
    "name": "Larry Fine",
    "born": 1902,
    "died": 1975
  },
  {
    "name": "Curly Howard",
    "born": 1903,
    "died": 1952
  },
  {
    "name": "Joe Besser",
    "born": 1907,
    "died": 1988
  },
  {
    "name": "Joe DeRita",
    "born": 1909,
    "died": 1993
  }
];

// Pretty self-descriptive
function computeAgeAtDeath(x) {
  x['ageAtDeath'] = x['died'] - x['born'];
  return x;
}

// Simple print
function printName(x) {
  console.log(x['name']);
}


// Application of a generic function across an array
// No preservation of context across each element
function iterateArray(dataArray, appliedFunction) {
  for (var i = 0; i < dataArray.length; i++) {
    appliedFunction(dataArray[i]);
  }
}

console.log("Print Stooge Names:")
iterateArray(stooges, printName);

console.log("\nApply Age Function Across Array:")
iterateArray(stooges, computeAgeAtDeath);
console.log(stooges);