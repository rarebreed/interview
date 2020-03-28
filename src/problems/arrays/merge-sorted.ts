/**
 * Given 2 meetings (which are each sorted) return a single array of sorted elements
 */

 import { Compare, defaultCompare } from "../../types/types";

export const merge = <T>(left: T[], right: T[], compareFn = defaultCompare ) => {
	let merged: T[] = [];
	let i = 0;
	let j = 0;

	while(i < left.length && j < right.length) {
		let v = compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++];
		merged.push(v);
	}

	// Merge any leftover array
	merged.concat(i < left.length ? left.slice(i) : right.slice(j));

	return merged;
}