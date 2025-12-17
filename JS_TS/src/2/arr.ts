import {
  mapArray,
  filterArray,
  reduceArray,
  partition,
  groupBy,
} from "./array-helpers.js";

console.log(mapArray([1, 2, 3], (n) => n * 2)); // [2, 4, 6]
filterArray(["a", "bb", "c"], (s) => s.length === 1); // ['a', 'c']
reduceArray([1, 2, 3], (a, n) => a + n, 0); // 6
partition([1, 2, 3, 4], (n) => n % 2 === 0); // [[2, 4], [1, 3]]
const grouped = groupBy(
  [
    { id: 1, tag: "home" },
    { id: 2, tag: "work" },
    { id: 3, tag: "home" },
  ],
  (t) => t.tag
);
// grouped => { home: [ {…}, {…} ], work: [ {…} ] }
