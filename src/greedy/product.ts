/**
 * Given an array of at least 3 ints, find the largest product of 3 of them
 * 
 * let test = [ 10, 2, 2, 9, 6, 3 ]
 * 
 * - Take the first 2 elements
 * - Take the product of these first two.
 * - Iterate through array
 *   - Check if next item is less than either of the two elements
 *   - If less than 3 elements, save it
 *   - If next item is larger than either 2 elements, store it in 
 */

const productof3 = (arr: number[]) => {
	let [first, second, ...rest] = arr;
	let min = Math.min(first, second);
	let max = Math.max(first, second);

	let prod2 = [max, min];
	let max3 = prod2;

	for (let i = 2; i < arr.length; i++) {
		let next = arr[i];

		// replace the min in prod2
		let [first, second, _] = max3;
		if (next > min) {
			if (next > max) {
				max3[0] = next;
				max3[1] = first;
				max3[2] = second
			} else {
				max3[1] = next;
				max3[2] = second;
			}
		} else {
			max3[2] = next;
		}
		min = max3[2];
		max = max3[0];
	}

	return max3;
}

export const test = [ 10, 2, 2, 9, 6, 3 ];

console.log(productof3(test));
