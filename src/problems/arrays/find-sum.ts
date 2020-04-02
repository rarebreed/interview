/**
 * In this problem, we need to find the elements in the array that sum to 0
 */
import { binarySearch } from "../../searching/binary-search-array";


/**
 * We will assume the array here is sorted
 * 
 * The idea here is take the element we are looking at and look for its negative
 * 
 * @param arr 
 */
export const findSumOfTwo = (arr: number[]) => {
  let result: [number, number][] = [];
  let cached: Set<number> = new Set();

  for(let i = 0; i < arr.length; i++) {
    if (cached.has(i)) {
      continue
    }
    // Look for a number that is negative of itself
    let ind = binarySearch(arr, -(arr[i]));
    if (ind === -1) {
      continue;
    }
    result.push([arr[i], arr[ind]]);
    cached.add(ind);
  }
  return result;
}

export const findSumOfThree = (arr: number[]) => {
  
}