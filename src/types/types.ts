export enum Compare {
	GREATER_THAN = 1,
	LESS_THAN = -1,
	EQUALS = 0
}

export type ICompareFn<T> = (lhs: T, rhs: T) => Compare;

export type IEqualsFunction<T> = (a: T, b: T) => boolean;

export interface IComparable<T> {
  compareTo: (left: T, right: T) => Compare
}

export class Comparable<T> {
  val: T;

  constructor(val: T) {
    this.val = val
  }

  compareTo = (cmp: Comparable<T>) => {
    return defaultCompare(this.val, cmp.val)
  }
}

export function defaultCompare<T>(a: T, b: T): number {
  //console.log(`Comparing ${a} to ${b}`);
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.GREATER_THAN;
}

export const swap = <T>(array: T[], a: number, b: number) => {
  [array[a], array[b]] = [array[b], array[a]];
}