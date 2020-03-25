/**
 * Write a function that takes an int, and then produces a console log of steps like this:
 * 
 * step(2)
 * "# "
 * "##"
 * 
 * step(3)
 * "#  "
 * "## "
 * "###"
 */

export const steps = (val: number) => {
	let start = 1;
	let display = "";
	while (start <= val) {
		display += "#"
		console.log(display);
		start++;
	}
} 