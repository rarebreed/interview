/**
 * Find all permutations of a string.
 * 
 * If we have a string of one character, that's our trivial case.
 * If we have a string of 2 characters, we can use this as our base case
 * 
 * Eg.  if we have "se" we have only two possibilities:
 * 
 * - s e
 * - e s
 * 
 * What happens if we have 3 letters?  Eg, "sea".  We iterate through, "pulling out"
 * the character at the index, leaving two other letters.  Now we are at our base case
 * 
 * - s [e a] 
 * - s [a e]
 * - e [s a]
 * - e [a s]
 * - a [s e]
 * - a [e s]
 * 
 * What if we have 4 letters?  this is like having 3 letters.  We iterate through the letters
 * pulling out the character at the index, leaving 3 characters left.  See the recursion?
 * 
 * - s [e a n]
 *   - s [e [a n]]
 *   - s [e [n a]]
 *   - s [a [e n]]
 *   - s [a [n e]]
 *   - s [n [e a]]
 *   - s [n [a e]]
 * - e [s a n]
 *   - e [s [a n]]
 *   - e [s [n a]]
 *   - e [a [s n]]
 *   - e [a [n s]]
 *   - e [n [s a]]
 *   - e [n [a s]]
 * - a [s e n]
 * - n [s e a]
 * 
 * If you look at the pattern, we can treat this as taking one letter out of
 * the array and saving it off.  We keep doing this until we hit the base case of 2 
 * characters.  So "descend" down into our subproblems.  Then as we return from our
 * function, we concatenate the results back
 */

export const permutations = <T>(arr: T[]) => {
	if (arr.length == 2) {
		let [first, second] = arr;
		let baseArray = [];
		baseArray.push([first, second]);
		baseArray.push([second, first]);
		return baseArray;
	} else {
		// Otherwise loop through.  This was incredibly tricky to figure out.
		// We are looping through, and while we loop through, we recursively call ourself.
		// So, when we walk "down", we hit out base case which returns 2 elements
		// This then gets concatenated with the first character, and then this merged result 
		// is returned.
		let merged: T[][] = [];
		for(let i = 0; i < arr.length; i++) {
			// "reduce" our array into a smaller array
			let subarr = arr.slice(0, i).concat(arr.slice(i+1));

			let pulled = arr[i];
			let base = permutations(subarr);
		  let newarr = base.map(str => {
				return [pulled].concat(str)
			})
			merged = merged.concat(newarr)
		}
		return merged
	}
}
