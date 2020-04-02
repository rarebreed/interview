/**
 * Imagine that you have an array of characters representing words:
 * 
 * [ 
 *   "s", "o", "l", "v", "e", " ",
 *   "t", "h", e", " ",
 *   "p", "r", "o", "b", "l", "e", "m"
 * ]
 * 
 * Come up with code that will reverse the words _in place_
 * 
 * 1. Reverse the characters
 * 2. Set start index to 0 and loop through array
 * 3. Find the index where a space is
 * 4. From start index, to spaceIndex-1, reverse this subset of the array
 * 5. Increment start index
 * 6. Repeat 3-5 until end of array
 * 
 */

import { reverse } from "../../fn";

type TupleOne = [number];
type TupleTwo = [number, number];
type Tuples = TupleOne | TupleTwo

export function* range(tup: Tuples) {
	let [start, end] = tup;
	if (!end) {
		end = start;
	}
	while (start < end) {
		yield start;
		start++;
	}
	yield end;
}

export const reversedIndexes = (arr: Tuples[]) => {
	return arr.reduce((acc: number[], r) => {
		let newarr = Array.from(range(r));
		acc = acc.concat(newarr)
		return acc;
	}, [])
}

export const reverseWords = (arr: string[]) => {
	// 1. Reverse the individual characters
	let reversed = reverse(arr);

	// 2. Start at 0 and loop through
	let index = 0;
	for(let i = 0; index < reversed.length; i++) {
		// 3. Find a space character
		if (reversed[i] === " " || i === reversed.length) {
			// 4. Reverse the slice where index is our start, and i - 1 is our end
			reverse(reversed, index, i -1);
			// 5. Set index to i + 1 as this is our new subslice
			index = i + 1;
		}
	}
	return reversed;
}