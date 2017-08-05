function isPositive(x) {
  if (x > 0)
    return true;
  else
    return false;
}


function isOdd(x) {
  if (Math.abs(x) % 2 == 1)
    return true;
  else
    return false;
}

function filter(array, test) {
  var passed = [];
  for (var i = 0; i < array.length; i++) {
    if (test(array[i]))
      passed.push(array[i]);
  }
  return passed;
}


var mixed = [5, -2, -1, 0, 2, 3]
var wholes = [1,2,3,4,5]

console.log(isPositive(2))
console.log(isPositive(-1))

console.log(filter(mixed, isPositive))
console.log(filter(mixed, isOdd))