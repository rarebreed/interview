/**
 * Show how to merge meeting times.
 * 
 * Given this:
 * 
 * [
 *   { startTime: 0,  endTime: 1 },
 *   { startTime: 3,  endTime: 5 },
 *   { startTime: 4,  endTime: 8 },
 *   { startTime: 10, endTime: 12 },
 *   { startTime: 9,  endTime: 10 },
 * ]
 * 
 * Return this:
 * 
 * [
 *   { startTime: 0, endTime: 1 },
 *   { startTime: 3, endTime: 8 },
 *   { startTime: 9, endTime: 12 },
 * ]
 * 
 * Any overlap between meetings needs to be merged into one larger block.
 * 
 * - Start at first element
 * - Get the second element
 * - Check if start time of 2nd object, is less than end time of first object
 *   - If it is, merge it so that end time of 2nd object becomes end time of 1st object
 * - Check if start time of 2nd object is less than start time of first object
 *   - If is is, start time of first object becomes start time of 2nd object, then then remove 2nd
 * 
 */

export interface Meeting {
	start: number, 
	end: number
}

export const mergeMeetings = (arr: Meeting[]): Meeting[] => {
	let index = 0;
	let final = [arr[0]]; // container of our merged meeting times

	while(index < arr.length -1) {
		// console.log(`index now ${index}`)
		let first = final[final.length - 1]; // compare last element in final
		let second = arr[index + 1]          // with next element in arr

		// console.log(`first = ${JSON.stringify(first, null, 2)}`);
		// console.log(`second = ${JSON.stringify(second, null, 2)}`);

		if (second.start <= first.end) {
			first.end = Math.max(first.end, second.end);
			// console.log(`Second begins less than first ends`);
		} else {
			final.push(second);
		}

		index++;
	}

  return final
}