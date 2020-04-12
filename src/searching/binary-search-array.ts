import { Compare, defaultCompare } from "../types/types";
import { quickSort } from "../sorting/quicksort";

export const DOES_NOT_EXIST = -1;

const binarySearchRecursive = <T>(
  array: T[],
  value: T, 
  low: number, // We use low and high to measure a "slice" of the array
  high: number, 
  compareFn = defaultCompare
): number => {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = array[mid];

    // Compare our desired value, with the value at the midpoint
    let compared = compareFn(value, element);
    if (compared === Compare.GREATER_THAN) { 
      // Our value greater than mid point, search to the right, by setting low to mid+1
      return binarySearchRecursive(array, value, mid + 1, high, compareFn);
    } else if (compared === Compare.LESS_THAN) {
      // Our value less than mid point, search to the left by setting high to mid-1
      return binarySearchRecursive(array, value, low, mid - 1, compareFn);
    } else {
      return mid; 
    }
  }
  return DOES_NOT_EXIST; // {4}
}

export const binarySearch = <T>(
  array: T[],
  value: T,
  compareFn = defaultCompare
) => {
  const sortedArray = quickSort(array);
  const low = 0;
  const high = sortedArray.length - 1;

  return binarySearchRecursive(array, value, low, high, compareFn);
}