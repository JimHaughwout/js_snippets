// Application of generic functions to iterate a function across an array
// carrying forward results across the array

// Our data
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


// Pretty self-explanatory
// No idea on why I am obsessed with this metric ;)
function computeAgeAtDeath(x) {
  return (x['died'] - x['born']);
}


// Initialization funciton for computing initial variables
// Avoiding complexity of objects at this time
function stoogeInit(x) {
  deathAge = computeAgeAtDeath(x);
  x['ageAtDeath'] = deathAge;
  x['oldestAgeAtDeath'] = deathAge;
  x['oldestSoFar'] = x['name'];
  return x;
}


// Increment function across Stooges
function stoogeCompare(thisStooge, lastStooge) {
  deathAge = computeAgeAtDeath(thisStooge);
  thisStooge['ageAtDeath'] = deathAge;

  if (deathAge > lastStooge['oldestAgeAtDeath']) {
    thisStooge['oldestAgeAtDeath'] = deathAge;
    thisStooge['oldestSoFar'] = thisStooge['name'];
  }
  else {
    thisStooge['oldestAgeAtDeath'] = lastStooge['oldestAgeAtDeath'];
    thisStooge['oldestSoFar'] = lastStooge['oldestSoFar'];
  }
  return thisStooge;
}


// Generic method to iterate and carry forward accumulated info
function iterateAndCarryForward(dataArray, initFunction, incrementFunction) {
  initFunction(dataArray[0]);
  for (var i = 1; i < dataArray.length; i++) {
    incrementFunction(dataArray[i], dataArray[i-1]);
  }
}


// Apply it
iterateAndCarryForward(stooges, stoogeInit, stoogeCompare);
console.log(stooges);