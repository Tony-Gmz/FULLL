/**
   * Displays numbers from 1 to N following the rules:
   * 
   * - If a number is divisible by 3, display "Fizz".
   * - If a number is divisible by 5, display "Buzz".
   * - If a number is divisible by both 3 and 5, display "FizzBuzz".
   * - Else, display the number itself.
   * 
   * @param {limit} number - The maximum number which the function will display.
   * 
   * @example
   * fizzBuzz(5);
   * // Output:
   * // 1
   * // 2
   * // Fizz
   * // 4
   * // Buzz
*/
function fizzBuzz(limit) {
  for (let i = 1; i <= limit; i++) {
    let answer = "";

    if (i % 3 === 0) {
        answer += 'Fizz';
    }
    if (i % 5 === 0) {
        answer += 'Buzz';
    }
    console.log(answer || i);
  }
}

// Get the input from the command line using the arguments values array
const input = process.argv[2];

// Check if the input is a valid number and call the fizzBuzz function or log an error message
if (input && input > 0 && Math.floor(input) === input) {
    fizzBuzz(input);
} else {
    console.error('Please provide a valid number for the FizzBuzz Game');
}