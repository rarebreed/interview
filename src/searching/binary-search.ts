import { Fn } from "../fn";
import { Compare, defaultCompare } from "../types/types";
import { quickSort } from "../sorting/quicksort";

export const DOES_NOT_EXIST = -1;

const binarySearchRecursive = <T>(
  array: T[],
  value: T, 
  low: number, 
  high: number, 
  compareFn = defaultCompare
): number => {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = array[mid];

    if (compareFn(element, value) === Compare.LESS_THAN) { // {1}
      return binarySearchRecursive(array, value, mid + 1, high, compareFn);
    } else if (compareFn(element, value) === Compare.GREATER_THAN) { // {2}
      return binarySearchRecursive(array, value, low, mid - 1, compareFn);
    } else {
      return mid; // {3}
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