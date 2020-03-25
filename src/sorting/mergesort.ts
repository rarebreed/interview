import { makeNumbers } from "../fn";
import { Compare, ICompareFn, defaultCompare } from "../types/types";

/**
 * Conquer part of the strategy
 * 
 * here, we recombine the arrays that were divided earlier.  The left and right arrays are already
 * trivially sorted.  So all that we are doing here is starting at 
 *         i
 * Left  [ 2, 6, 9]
 * Right [ 4, 7 ]
 *         j
 * 
 * compare left[i] with right[j].  Whichever is smaller, take that element and push into a new array
 * and increment the index.  Continue until the first index has reached the end of its array.  If
 * the other array is not at the end, add concatenate  its remaining elements to the end of the new
 * array.
 * 
 * @param left 
 * @param right 
 * @param compareFn 
 */
const merge = <T>(left: T[], right: T[], compareFn: ICompareFn<T>) => {
  let i = 0;
  let j = 0;
  const result = [];

	//console.log("Merging arrays", left, right)
  while (i < left.length && j < right.length) {
    result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
  }

	let merged =  result.concat(i < left.length ? left.slice(i) : right.slice(j));
	//console.log("merged array", merged);
	return merged;
}

/**
 * mergeSort is the Divide part of the strategy.  We find the middle of the array and keep splitting
 * until we have a trivial array of size 1.
 * 
 * Notice how the recursion works.  The mergeSort is recursive left, then right
 * @param array 
 * @param compareFn 
 */
const mergeSort = <T>(array: T[], compareFn: ICompareFn<T>) => {
	//console.log("Going to split array", array)
  if (array.length > 1) { // {1}
    const { length } = array;
		const middle = Math.floor(length / 2); // {2}
		//console.log("Going left")
		const left = mergeSort(array.slice(0, middle), compareFn); // {3}
		//console.log("Going right")
    const right = mergeSort(array.slice(middle, length), compareFn); // {4}
    array = merge(left, right, compareFn); // {5}
  }
  return array; 
}



export const testVals = makeNumbers(10);
console.log("unsorted", testVals)

let sorted = mergeSort(testVals, defaultCompare);

console.log("sorted", sorted);