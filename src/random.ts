export const random = (start: number, end?: number) => {
	if (!end) {
		end = start;
		start = 1;
	}
	return Math.floor(Math.random() * (end - start)) + start
}

export function* genRand(count: number, start: number, end?: number) {
	if (!end) {
		end = start;
		start = 1;
	}

	while (count > 0) {
		yield random(start, end);
		count--;
	}
}

export function* _range(startAt?: number) {
	if (!startAt) {
		startAt = 1
	}

  while (true) {
		yield startAt;
		startAt++;
	}
}

export const take = (gen: Iterator<number>, amount: number) => {
	let accum = [];

	while (amount > 0) {
		accum.push(gen.next().value)
		amount--;
	}

	return accum;
}

export const range = (amount: number, startAt: number = 1) => {
	return take(_range(startAt), amount);
}