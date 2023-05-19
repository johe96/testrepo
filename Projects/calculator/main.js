// Import logic, ...
import { add, subtract, multiply, divide } from './logic.js';
// Main function.
function menu() {
    // FIXME: make a 'readline' module (because this is using Node.js)
    let num1 = prompt('Insert number.');
    let num2 = prompt('Insert another number.');
    let operation = prompt('What arithmetic operation do you want to do?');

    if (operation == add) {
        add(num1, num2);

    } else if (operation == subtract) {
        subtract();

    } else if (operation == multiply) {
        multiply();

    } else if (operation == divide) {
        divide();

    } else if (operation == exit) {
        return;
    }
}

menu();
