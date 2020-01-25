/**
 * Divide one array, into sub arrays.
 * 
 * [1, 2, 3, 4, 5, 6, 7, 8, 9], 2 => [[1, 2], [3, 4], [5, 6], [7, 8]]
 */

const chunk = (arr: number[], size: number) => {
	let container = [];
	for(let i = 0; i < arr.length; i+=size) {
		let subarray = [];
		for(let inner = 0; inner < size; inner++ ) {
			if ((i + inner) > arr.length -1) {
				break
			}
			subarray.push(arr[i + inner])
		}
		container.push(subarray)
	}
	return container
}

let test = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let res = chunk(test, 3);

console.log(res);