const _ = require('lodash');

// Define an array
let arr = [1, 2, 3, 4, 5];

// Define a predicate function
function isEven(n) {
  return n % 2 === 0;
}

// Remove elements by predicate and get removed elements
let removed = _.remove(arr, isEven);

// Log results
console.log(arr); // [1, 3, 5]
console.log(removed); // [2, 4]