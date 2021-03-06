/**
 * Find most money that could have been made
 * 
 * let test = [10, 7, 5, 8, 11, 9];
 * 
 * answer would be 6, buy at 5, sell at 11
 * 
 * let test2 = [10, 11, 8, 7, 9, 5] // answer 1
 * 
 * This is a greedy style algorithm.
 * 
 * - Keep track of max profit so far (starts at 0)
 * - Keep track of minimum price we have seen so far (starts at arr[0])
 * - Start iterating
 * - store arr[i] - minPrice to profit
 * - if profit > maxProfit, store profit value as new maxProfit
 * - If value at arr[i] is the smallest price we have seen, minPrice = arr[i]
 * - at end return maxProfit
 */

export const maxDiff = (arr: number[]) => {
	let minPrice = arr[0];  // Keep track of min price we have seen so far
	let maxProfit = 0;

	// Start at i = 1 (the second element) since we are comparing against the first
	for(let i = 1; i < arr.length - 1; i++) {
		let profit = arr[i] - minPrice;
		if (profit > maxProfit) {
			maxProfit = profit;
		}

		if (arr[i] < minPrice) {
			minPrice = arr[i];
		}
	}
	return maxProfit;
}