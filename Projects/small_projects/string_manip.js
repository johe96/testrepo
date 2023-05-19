// TODO: split the functions into separate modules, isPalindrome. 
// Add more string manipulation functions.
function isPalindrome(str) {
    // Clean it, make the string to lowercase.
    let clean_string = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Reverse the cleaned string.
    // split(), splits the string in regard to whitespace characters: // ['hello']
    // split(''), splits the string into an array of individual characters: // ['h', 'e', 'l',..]
    // Same principal with join()/join(''). Former joins the elements of the array with a comma , 
    // as the separator, the latter joins the elements without any separator between them.
    let reversed_string = clean_string.split('').reverse().join('');
    
    console.log(`This is your reversed string,  ${reversed_string}`); 
    // string interpolation is done using backticks in order to include variables in a console.log statement
    return clean_string === reversed_string;
}

function reverse(str){
    let reversed_string = str('').reverse().join('');
    return reversed_string;
}

function menu() {     
    console.log('[Input a string to check if it\'s a palindrome]');
    input();
}

function error_handling() {
    if (process.argv.length !== 3){
        console.error('Error: You must pass a string argument to this program.');
        process.exit(1);
    }
}

function input() {
    //error_handling();
    
    const readline = require('readline'); // tell Node.js to load the built-in 'readline' module, 
    //allows the user to input a parameter.

    const r1 = readline.createInterface({ // creates a 'readline' interface using 'readline.createInterface()'
        //sets input to 'process.stdin'
        input: process.stdin,
        //sets output to 'process.stdout'
        output: process.stdout
        // this means that the user's input will come from the standard input (keyboard) 
        // and the p rogram's output will go to the standard output (console) 
    });
    // this line uses the 'question()' method of the 'readline' interface to ask the user a question.
    r1.question('Enter a string: ', (answer) => { // this is the prompt for the user, and the function passed as 
        //second argument is a callback function that will be called when the user enters the input (answer)
        console.log(`You entered: ${answer}`);
        console.log(isPalindrome(`${answer}`))
        r1.close(); // we close the readline interface, exits the program
    }); // So, in summary, this code is asking the user to enter a string, and then logging the string to the console.


    /*
    let user_input = process.argv[2];
    console.log(isPalindrome(user_input));
    */
}


function init() {
    menu();
}

init();