/**
 * In this dynamic programming problem, we need to figure out all possibilities of a weight and
 * a value.
 */

interface CakeType {
	weight: number,
	value: number
}

function maxDuffelBagValue(cakeTypes: CakeType[], weightCapacity: number) {

	// We make an array to hold the maximum possible value at every duffel bag weight capacity
	// from 0 to weightCapacity starting each index with value 0
  const maxValuesAtCapacities = new Array(weightCapacity + 1).fill(0);

	// The outer loop will walk through a weight one by one.  Why?  If we have a cake with a weight of
	// one, then we can always have our currentCapacity + 1.  Also, this lets us test every possible
	// weight capacity.
  for (let currentCapacityIdx = 0; currentCapacityIdx <= weightCapacity; currentCapacityIdx++) {

    // Set a variable to hold the max monetary value so far for currentCapacity
    let currentMaxValue = 0;

    // The inner loop, we check each cake type
    for (let j = 0; j < cakeTypes.length; j++) {
			const cakeType = cakeTypes[j];
			let { weight: cakeWeight, value: cakeValue} = cakeType;

			// If a cake weighs 0 and has a positive value the value of our duffel bag is infinite!
			// This is for a special case only
      if (cakeWeight === 0 && cakeValue !== 0) {
        return Infinity;
      }

      // If the current cake weighs as much or less than the current weight capacity
      // it's possible taking the cake would get a better value
      if (cakeWeight <= currentCapacityIdx) {

        // So we check: should we use the cake or not?
        // If we use the cake, the most kilograms we can include in addition to the cake
        // We're adding is the current capacity minus the cake's weight. we find the max
        // value at that integer capacity in our array maxValuesAtCapacities
        const maxValueOfCake = cakeValue + maxValuesAtCapacities[currentCapacityIdx - cakeWeight];

        // Now we see if it's worth taking the cake. how does the
        // value with the cake compare to the currentMaxValue?
        currentMaxValue = Math.max(maxValueOfCake, currentMaxValue);
      }
    }

    // Add each capacity's max value to our array so we can use them
    // when calculating all the remaining capacities
    maxValuesAtCapacities[currentCapacityIdx] = currentMaxValue;
  }

  return maxValuesAtCapacities[weightCapacity];
}