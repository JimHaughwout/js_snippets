/*
Translating filter, map, reduce patterns to JS
All simply stuff. Just learning to do in JS vs Scala or Python.
Ultimate goal is to enable is use in things like Google Cloud Functions 
*/

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


// Calculates age at death
function ageAtDeath(person) {
  return person.died - person.born;
}


// True if person died below age 70
function diedYoung(person) {
  age = ageAtDeath(person);
  if (age < 70)
    return true;
  else
    return false;
}


/*
Maps biographical object to simple one with age at death
Yes, I could have just appended the age but I wanted a true transformation
to illustrate the example
*/
function mapNameAndDeathAge(person) {
  deathAge = ageAtDeath(person);
  name = person.name;
  return {"name" : name, "ageAtDeath": deathAge};
}


// Who Died Younger
function lessLucky(personA, personB) {
  if (personA.ageAtDeath <= personB.ageAtDeath)
    return personA;
  else
    return personB
}


// Maps using higher order function
function mapArray(array, transformFunction) {
  var mapped = [];
  for (var i = 0; i < array.length; i++) {
    mapped.push(transformFunction(array[i]));
  }
  return mapped;
}


// Filters via higher order function
function filterArray(array, filterFunction) {
  var passed = [];
  for (var i = 0; i < array.length; i++) {
    if (filterFunction(array[i]))
      passed.push(array[i]);
  }
  return passed;
}

// Reduces by higher order function
function reduceArray(array, reduceFunction) {
  result = array[0];
  for (var i = 1; i < array.length; i++) {
    result = reduceFunction(result, array[i]);
  }
  return result;
}

// Show the Data
console.log("\nDATA: Three Stooges - Birth and Death")
console.log(stooges)

// Apply Map function
console.log("\nMAP: Stooge Age at Death:")
console.log(mapArray(stooges, mapNameAndDeathAge))

// Apply Filter function 
console.log("\nFILTER: Stooges who died young:")
console.log(filterArray(stooges, diedYoung))

// Both together
console.log("\nMAP AND FILTER:")
console.log(mapArray(filterArray(stooges, diedYoung), mapNameAndDeathAge))

// Classic Map-reduce pattern 
console.log("\nMAP AND REDUCE: Who died youngest:")
console.log(reduceArray(mapArray(stooges, mapNameAndDeathAge), lessLucky))