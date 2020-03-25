import { ICompareFn, Compare, swap, defaultCompare } from "../types/types";
import { makeNumbers, display } from "../fn";

const partition = (
  array: any[],
  left: number,
  right: number,
  compareFn: ICompareFn<any>
) => {
  const pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  console.log('pivot value is ' + pivot + '; left is ' + left + '; right is ' + right);

  // Check if the value at position i is less than our pivot _index_.  If it is, increment i and
  // repeat.  In other words, we are _squeezing_ towards the middle
  while (i <= j) {
    //console.log(`i = ${i}, j = ${j}`);

    // Here we are checking the left side
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      //console.log(`    i = ${i}. array[${i}]: ${array[i]} less than ${pivot}`);
      i++;
    }
   // console.log(`  i is now ${i}`)

    // Here we check the right side
    while (compareFn(array[j], pivot) === Compare.GREATER_THAN) {
      //console.log(`    j = ${j}. array[${j}]: ${array[j]} greater than ${pivot}`);
      j--;
    }
    //console.log(`  j is now ${j}`)

    // At this point, we've found the first i index whose value is greater than pivot, and the first
    // j index, whose value is less than pivot.  Swap these values to the other "side".  Once we
    // swap we increment i by 1, and decrement j by and continue checking each side
    if (i <= j) {
      //console.log(`  swap array[${i}] = ${array[i]} with array[${j}] = ${array[j]}`);
      swap(array, i, j);
      //console.log("array is now: ");
      display(array);
      i++;
      j--;
    }
  }

  //console.log("End partition: returning ", i);
  return i;
};

const part = <T>(
  arr: T[],
  left: number,
  right: number,
  compareFn: ICompareFn<T>
) => {
  const pivot = arr[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  console.log('pivot value is ' + pivot + '; left is ' + left + '; right is ' + right);

  while(i <= j) {
    // Check left
    while(compareFn(arr[i], pivot) === Compare.LESS_THAN) {
      i++
    }

    while(compareFn(arr[j], pivot) === Compare.GREATER_THAN) {
      j--
    }

    if (i <= j) {
      swap(arr, i, j);
      display(arr)
      i++
      j--
    }
  }

  return i;
}

/**
 * This is our divide function for sorting
 * 
 * 
 * 
 * @param array 
 * @param left 
 * @param right 
 * @param compareFn 
 */
const quick = function(
  array: any[],
  left: number,
  right: number,
  compareFn: ICompareFn<any>
) {
  let index;

  if (array.length > 1) {
    index = partition(array, left, right, compareFn);

    if (left < index - 1) {
      console.log(`Sorting left`)
      quick(array, left, index - 1, compareFn);
    }

    if (index < right) {
      console.log(`Sorting right`)
      quick(array, index, right, compareFn);
    }
  }
  return array;
};

export const quickSort = (array: any[], compareFn = defaultCompare) => {
  return quick(array, 0, array.length - 1, compareFn);
};

const qs = <T>(
  arr: T[],
  left: number,
  right: number,
  compareFn: ICompareFn<T>
) => {
  let index;
  if (arr.length > 1) {
    index = part(arr, left, right, compareFn);

    if (left < index - 1) {
      qs(arr, left, index - 1, compareFn);
    }

    if (index < right) {
      qs(arr, index, right, compareFn);
    }
  }
  return arr;
}

export const qsort = <T>(
  arr: T[],
  compareFn = defaultCompare
) => {
  return qs(arr, 0, arr.length - 1, compareFn);
}

let unsorted = makeNumbers(10);
console.log("Starting with");
display(unsorted);

let sorted = qsort(unsorted, defaultCompare)
console.log("Sorted is now")
display(sorted)