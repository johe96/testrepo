/*
The time complexity of the bubbleSort algorithm is O(n^2), where n is the number of elements in the array.
This is because the algorithm has two nested loops that each iterate through the array, resulting in a worst-case scenario of n * n operations.
*/

export function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        } 
    }
    return arr;
}