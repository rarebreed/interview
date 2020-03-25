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
	while (start <= end) {
		yield start;
		start += inc;
	}
}

export const take = <T>(gen: Iterable<T>) => (amt: number) => {
	let start = 0;
	let result: T[] = [];
	for(const val of gen) {
		if (start > amt) break
		result.push(val);
		start++;
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