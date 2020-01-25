export const mergeSorted = (arr1: number[], arr2: number[]): number[] => {
	let ind1 = 0;  // Create an index that points to the current value of arr1
	let ind2 = 0;  // Do the same for arr2
	let merged = []

	// Loop through the shorter of arr1 or arr2.
	while (ind1 < arr1.length && ind2 < arr2.length) {
		// If the element pointed to in arr1 is less than element pointed to in arr2
		// add the arr1 element to merged, and increment the ind1 "pointer"
		if (arr1[ind1] < arr2[ind2]) {
			merged.push(arr1[ind1]);
			ind1++;
		} else if (arr2[ind2] < arr1[ind1]) { // If arr2 is smaller, do the same for arr2
			merged.push(arr2[ind2]);
			ind2++;
		} else { // they are equal, so increment both pointers, and store to merged
			merged.push(arr1[ind1]);
			ind1++;
			ind2++
		}
	}

	// Because arr1 might be longer than arr2, add any additional elements
	while (ind1 < arr1.length) {
		merged.push(arr1[ind1]);
		ind1++;
	}

	// As above, except if arr2 greater than arr1 in size
	while (ind2 < arr2.length) {
		merged.push(arr2[ind2]);
		ind2++
	}

	return merged
}