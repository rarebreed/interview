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

export function* toGen<T>(it: Iterable<T>) {
	for(const i of it) {
		yield i;
	}
}

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

export const makeNumbers = (amt: number) => {
	return Fn.new()
	   .range()
		 .take(amt - 1)
		 .map((_) => Math.floor(Math.random() * (amt + 1)))
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

export const reverse = <T>(arr: T[], start?: number, last?: number) => {
	if (!start) {
		start = 0;
	}

	if (!last) {
		last = arr.length - 1;
	}

	const checkIndex = (ind: number, msg: string) => {
		if (ind >= arr.length) {
			throw new Error(msg)
		}
	}
	checkIndex(start, `start[${start}] can't be greater than array length of ${arr.length}`);
	checkIndex(last, `start[${last}] can't be greater than array length of ${arr.length}`);

  while (start < last) {
		// swap first with last
		[arr[start], arr[last]] = [arr[last], arr[start]]
    
		start++;
		last--;
	}

	return arr;
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