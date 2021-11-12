/**
 * Write a program that prints every number from 1 to 100. However, if it’s
 * a multiple of 3, it should print “Fizz”. If it’s a multiple of 5, it should
 * print “Buzz”. If it’s a multiple of 3 and 5, it should print “FizzBuzz”.
 *
 * @param {Integer} start
 * @param {Integer} end
 * @returns {Void} returns std output
 *
 */
const fizzBuzz = (start, end) => {
	for (let i = start; i < end + 1; i++) {
		if (i % 3 == 0 && i % 5 == 0) {
			console.log(i, 'FizzBuzz');
		} else if (i % 3 === 0) {
			console.log(i, 'Fizz');
		} else if (i % 5 == 0) {
			console.log(i, 'Buzz');
		} else {
			console.log(i);
		}
	}
};

fizzBuzz(1, 100);
