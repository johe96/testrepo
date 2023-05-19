/*
The time complexity of this insertion sort algorithm is O(n^2), where n is the length of the input array.
The outer loop iterates through each element of the array, and the inner loop iterates through a portion of the array to find the correct position to insert the current element.
In the worst case, when the array is sorted in reverse order, each inner loop iteration will shift all of the elements to the right, resulting in n^2 comparisons and swaps.
*/

export function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++){
        let current = arr[i];

        let j = i - 1;

        while (j > -1 && current < arr[j]) {
            arr[j + 1] = arr[j];
            j --;
        }
        arr[j + 1] = current;
    }
    return arr;
}