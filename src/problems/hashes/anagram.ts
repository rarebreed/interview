/**
 * Check to see if one string is an anagram of another string
 * 
 * Basically this is a counting strategy.  Uses a map where the key is a letter, and the value is
 * the number of occurrences.  A word is an anagram of another word if each letter in one map exists
 * in the other map, and there are at least as many occurrences in the other map
 */

const isAnagram = (s1: string, s2: string): boolean => {
	let s1arr = Array.from(s1);
	let s2arr = Array.from(s2);

	const reducer = (acc: Map<string, number>, n: string) => {
		let count = acc.get(n);
		if (count !== undefined) {
			acc.set(n, count + 1)  // We have seen this letter, so increment count
		} else {
			acc.set(n, 1);  // We haven't seen this letter, start at 1
		}

		return acc;
	}

	// Create a map of letter to occurrences, ignoring spaces and capitalization
	let s1map = s1arr
		.filter(i => i !== " ")
		.map(c => c.toLowerCase())
		.reduce(reducer, new Map<string, number>());
	let s2map = s2arr
		.filter(i => i !== " ")
		.map(c => c.toLowerCase())
		.reduce(reducer, new Map<string, number>());

	// Check if each entry in s2map, has same entry in s1map, and at least as many
	let result = Array.from(s2map.entries()).every(([key, val]) => {
		let count = s1map.get(key);
		if (count === undefined) {
			console.log(`Could not find key of '${key}' in string1 = ${s1}`)
			return false
		}

		if (count < val) {
			console.log(`There are more values of ${key} in ${s2} than ${s1}`)
			return false
		}
		return true
	})

	return result
}

let test1 = "fairy tale";
let test2 = "rail safety";

console.log(isAnagram(test2, test1));