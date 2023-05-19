/*
The time complexity of the selection sort function you provided is O(n^2), where n is the number of elements in the array to be sorted.
The outer loop runs n times, where n is the length of the input array, and for each iteration of the outer loop, the inner loop runs (n-i) times, where i is the index of the current iteration of the outer loop. 
This means that the total number of comparisons made is:
(n-1) + (n-2) + ... + 2 + 1 = n(n-1)/2
which is a quadratic function of n and hence has a time complexity of O(n^2).
In addition to the comparisons, the selection sort algorithm also performs n swaps in the worst case, but since the number of swaps is proportional to n, the time complexity remains O(n^2).
Overall, while selection sort is not the most efficient sorting algorithm, it is simple to understand and implement, and may be a good choice for small arrays or arrays with a small number of unique values.
*/

export function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++){
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i){
            [arr[i], arr[min]] = [arr[min], arr[i]];
        }
    }
    return arr;
}