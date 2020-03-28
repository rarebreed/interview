/**
 * In this problem, we need to find the elements in the array that sum to 0
 */
import { binarySearch } from "../../searching/binary-search-array";


/**
 * We will assume the array here is sorted
 * 
 * @param arr 
 */
export const findSumOfTwo = (arr: number[]) => {
  let result: [number, number][] = [];

  for(let i = 0; i < arr.length; i++) {
    // Look for a number that is negative of itself
    let ind = binarySearch(arr, -(arr[i]));
    if (ind === -1) {
      continue;
    }
    result.push([arr[i], arr[ind]])
  }
  return result;
}