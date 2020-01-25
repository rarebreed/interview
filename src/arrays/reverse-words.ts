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
 * [
 *   "p", "r", "o", "b", "l", "e", "m", " ",
 *   "t", "h", e", " ",
 *   "s", "o", "l", "v", "e"
 * ]
 * 
 * 1. Reverse the characters
 * 2. Set start index to 0 and loop through array
 * 3. Find the index where a space is
 * 4. From start index, to spaceIndex-1, reverse this subset of the array
 * 5. Increment start index
 * 6. Repeat 3-5 until end of array
 * 
 */

import { reverse } from "./reverse";

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

export const test = [ 
	"s", "o", "l", "v", "e", " ",
	"t", "h", "e", " ",
	"p", "r", "o", "b", "l", "e", "m"
];

export const reversedIndexes = (arr: Tuples[]) => {
	return arr.reduce((acc: number[], r) => {
		let newarr = Array.from(range(r));
		acc = acc.concat(newarr)
		return acc;
	}, [])
}

const reverseWords = (arr: string[]) => {
	let reversed = reverse(arr);
	console.log(reversed);

	let index = 0;
	for(let i = 0; index < reversed.length; i++) {
		if (reversed[i] === " " || i === reversed.length) {
			reverse(reversed, index, i -1);
			index = i + 1;
		}
	}
	return reversed;
}

console.log(reverseWords(test))