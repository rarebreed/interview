import { Fn } from "../fn";

export const shuffle = <T>(array: T[]) => {
	for(let i = array.length - 1; i > 0; i--) {
		let randSlot = Math.floor(Math.random() * (i + 1))  // don't pick the last index
		// swap last element with random slot
		let lastElement = array[i];
		let toSwap = array[randSlot];
		array[i] = toSwap;
		array[randSlot] = lastElement;
	}
}

let arr = Fn.new()
	.range()
	.take(10)

shuffle(arr)

console.log(arr)