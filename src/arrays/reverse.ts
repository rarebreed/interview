/**
 * Reverses an array
 * 
 * example
 * 
 * ["h", "e", "l", "l", "o"]
 * ["o", "l", "l", "e", "h"]
 * 
 * ["s", "e", "a", "n"]
 * ["n", "a", "e", "s"]
 */

export const reverse = <T>(arr: T[], start?: number, last?: number) => {
	if (!start) {
		start = 0;
	}

	if (!last) {
		last = arr.length - 1;
	}

	const checkIndex = (ind: number, msg: string) => {
		if (ind >= arr.length) {
			throw new Error(msg)
		}
	}
	checkIndex(start, `start[${start}] can't be greater than array length of ${arr.length}`);
	checkIndex(last, `start[${last}] can't be greater than array length of ${arr.length}`);

  while (start < last) {
		// swap first with last
		let tmp = arr[start];
		arr[start] = arr[last];
		arr[last] = tmp
    
		start++;
		last--;
	}

	return arr;
}

let test1 = ["h", "e", "l", "l", "o"];
let test2 = ["s", "e", "a", "n", "", "t", "o", "n", "e", "r"]

console.log(reverse(test1))
console.log(reverse(test2, 3, 6))