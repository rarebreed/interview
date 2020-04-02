/**
 * A small functional programming library
 *
 * This is a more practical FP library that espouses speed over some purely FP concepts, like for
 * example, only using recursion instead of loops.  While recursion is great when it comes to
 * understanding an algorithm, many languages (javascript included) do not do tail call optimization
 * or elimination.
 *
 * Moreover, as rust has shown, side effects can be controlled to some extent, even in the face of
 * mutation.  The great bane of side effects has been the inability to reason about state.  Rust
 * however has managed to mostly side step that issue by using an Affine type system.  While
 * typescript does not have the same Affine type system, it's possible to take the algorithms here,
 * and more easily port them to rust.
 *
 * Some concepts do not (yet) exist in rust, such as generators, but there are closely related
 * concepts like Streams.
 */

/**
 * Inclusive range generator
 * 
 * @param end 
 * @param start 
 * @param inc 
 */
export function* range(
	end: number = Infinity,
	start: number = 0,
	inc: number = 1
): Generator<number> {
	while (start < end) {
		yield start;
		start += inc;
	}
}

/**
 * Takes up to a certain amount of items from an iterable
 * 
 * If there are less items in the iterable than the amount, then it will only return the items
 * available from the iterable.
 * 
 * This function is useful for "infinite" ranges as returned from range(), or if you have a
 * generator and want to return an array to use the Array.prototype, rather than just use the for-of
 * syntax for iterables.
 * 
 * @param iter 
 */
export const take = <T>(iter: Iterable<T>) => (amt: number) => {
	let start = 0;
	let result: T[] = [];

	let gen = iter[Symbol.iterator]();
	
	while (amt > start) {
		let item = gen.next();
		start++;
		if (!item.done) {
			result.push(item.value)
		} else {
			break;
		}
	}

	return result;
}

/**
 * Converts an iterable to a generator
 * 
 * @param it 
 */
export function* toGen<T>(it: Iterable<T>) {
	for(const i of it) {
		yield i;
	}
}

/**
 * Takes two iterables, and then zips them into an generator
 * 
 * The generator yields [[it1[0], it2[0]], [it1[1], it2[1]], ...] until the first iterable is
 * consumed. 
 * 
 * @param it1 
 * @param it2 
 */
export function* zip<T1, T2>(it1: Iterable<T1>, it2: Iterable<T2>) {
	let gen1 = toGen(it1);
	let gen2 = toGen(it2);

	while (true) {
		let n = gen1.next();
		let m = gen2.next();
		if (n.done === undefined || n.done === true) {
			break
		} 
		if (m.done === undefined || m.done === true) {
			break
		} 

		yield [n.value, m.value] as [T1, T2]
	}
}

export interface MakeNumOptions {
	negative?: boolean,
	exclusive?: boolean,
	range?: [number, number]
}

const defaultMakeNumOpts: MakeNumOptions = {
	negative: false,
	exclusive: false
}

/**
 * Helper function to make randomized arrays of numbers
 * 
 * You can use it like this:
 * 
 * ```javascript
 * let rand = makeNumbers(6) // []
 * rand = makeNumbers(6, { negative: true }) // 
 * rand = makeNumbers(6, { exclusive: true }) // 
 * rand = makeNumbers(6, {
 *   exclusive: true,
 *   negative: true
 * })
 * 
 * rand = makeNumbers(6, { range: [20, 29] })
 * ```
 * 
 * @param amt 
 * @param options 
 */
export const makeNumbers = (amt: number, options: MakeNumOptions = defaultMakeNumOpts) => {
	let start = 1;
	let end = amt;
	let { negative, exclusive } = options;
	
	console.log(options);
	if (options.range !== undefined) {
		[start, end] = options.range;
	}

	let total = end + 1 - start

	let neg: number[] = [];
	if (negative) {
		neg = Fn.new()
			.range(-start + 1, -end)
			.take(total)
	}

	let rand = Fn.new()
	   .range(end + 1, start)
		 .take(total);
	
	rand = neg.concat(rand)

	if (exclusive) {
		shuffle(rand);
	} else {
		rand = rand.map((_) => Math.floor(Math.random() * ((end - start) + 1)) + start)
	}

	return take(rand)(amt)
}

export const display = <T>(arr: T[]) => {
	const zipped = zip(range(), arr);
  for(const [i, val] of zipped) {
		console.log(`${i}: ${val}`)
	}
}

/**
 * Takes an iterable (eg, an array or generator) and returns a pairwise tuple of elements.
 * 
 * Returns a new array, leaving the original iterable untouched
 * 
 * For example:
 * 
 * ```typescript
 * let paired = pair([1, 2, 3])  // [[1, 2], [2, 3]]
 * ```
 */
export const pair = <T>(iter: Iterable<T>) => {
	let gen = toGen(iter);

	// Collect the first 2
	let results: [T, T][] = [];
	let [first, second] = take(gen)(2);
	// Remember the second result, as it will become the first element of the next
	let last = second;

	// If we don't have at least 2 elements, don't add to results
	if (first && second) {
		results.push([first, second]);
	}

	while (true) {
		// Take next item
		let [next] = take(gen)(1);
		if (!next) {
			break;
		}

		results.push([last, next]);
		last = next;
	}

	return results;
}

/**
 * Divide one array, into sub arrays.
 * 
 * Creates a new array, leaving the oringinal unmodified
 * 
 * Example
 * 
 * ```typescript
 * chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 2) // => [[1, 2], [3, 4], [5, 6], [7, 8]]
 * ```
 * 
 * @param arr 
 * @param size 
 */
export const chunk = <T>(arr: T[], size: number) => {
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

/**
 * Takes a possibly nested array and flattens it
 * 
 * Leaves the original array intact by using a new array
 * 
 * Example:
 * 
 * ```javascript
 * flatten([1, [2, 3], [4, [5, 6]]])  // [1, 2, 3, 4, 5, 6]
 * ```
 * 
 * @param arr 
 * @param flattened 
 */
export const flatten = (arr: any[], flattened: any[] = []) => {
  for (const sub of arr) {
		if (sub instanceof Array) {
			flatten(sub, flattened)
		} else {
			flattened.push(sub)
		}
	}
	return flattened;
}

/**
 * Reverses a slice of an array
 * 
 * This function mutates the array
 * 
 * @param arr 
 * @param start 
 * @param last 
 */
export const reverse = <T>(arr: T[], start?: number, last?: number) => {
	if (!start) {
		start = 0;
	}

	if (!last) {
		last = arr.length - 1;
	}

	// Error checking to make sure the user doesn't pass in an invalid slice
	const checkIndex = (ind: number, msg: string) => {
		if (ind >= arr.length) {
			throw new Error(msg)
		}
	}
	checkIndex(start, `start[${start}] can't be greater than array length of ${arr.length}`);
	checkIndex(last, `start[${last}] can't be greater than array length of ${arr.length}`);

  while (start < last) {
		// swap first with last
		swap(arr, start, last)
    
		start++;
		last--;
	}

	return arr;
}

/**
 * Swaps indexes of an array
 * 
 * This function mutates the array passed in
 * 
 * @param arr 
 * @param idx1 
 * @param idx2 
 */
export const swap = <T>(arr: T[], idx1: number, idx2: number) => {
	[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

/**
 * Shuffle algorithm
 * 
 * Swaps the last element with a random element from 0, arr.length - 2 (it can't swap the last
 * element which is arr.length - 1 which would be swapping with itself).  Repeat the process with 
 * the next to last element, etc.
 * 
 * @param array 
 */
export const shuffle = <T>(array: T[]) => {
	for(let i = array.length - 1; i > 0; i--) {
		let randSlot = Math.floor(Math.random() * (i + 1))  // don't pick the last index
		// swap last element with random slot
		swap(array, i, randSlot);
	}
}

export namespace Utils {
	export const factorial = (n: number, acc?: number): number => {
		if (!acc) {
			acc = 1
		}

		if (n === 0) return acc;
		if (n < 0) throw new Error("n must be >= 0");

		acc = acc * n;
		return factorial(n - 1, acc);
	}

	export const dumbFib = (n: number): number => {
		if (n < 1) return 0 
		if (n <= 2) return 1

		return dumbFib(n - 1) + dumbFib(n - 2)
	}

  export function fibMem(n: number) {
		if (n < 1) { return 0; }
		const memo = [0, 1];

		const fibonacciMem = (num: number): number => {
			if (memo[num] != null) return memo[num];
			memo[num] = fibonacciMem(num - 1) + fibonacciMem(num - 2);
			return memo[num]
		};
		return fibonacciMem(n);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Combinators
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The Kestrel combinator
 * @param x 
 */
const K = <T>(x: T) => (y: (x: T) => void) => {
	return x
}

export const tap = K;

/**
 * The identity combinator
 * 
 * @param x 
 */
const I = <T>(x: T): T => {
	return x
}



/**
 * A simple class type that makes it easier to chain together functional operations by using a
 * Builder pattern
 */
export class Fn {
	private gen: Generator<number> | null
	private taken: number[]

	constructor() {
		this.gen = null;
		this.taken = [];
	}

	static new = () => {
		return new Fn()
	}

	range = (end: number = Infinity, start: number = 0, inc: number = 1)=> {
		this.gen = range(end, start, inc);
		return this
	}

	take = (amt: number) => {
		if (this.gen === null) {
			throw new Error("this.gen is null")
		}
		this.taken = take(this.gen)(amt);
		return this.taken
	}
}