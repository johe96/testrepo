/*
The time complexity of the simple version of quicksort is O(n log n) on average and O(n^2) in the worst case.
In the worst case, when the pivot is chosen to be the smallest or largest element in the array and the array is already sorted or nearly sorted, the algorithm will perform very poorly.
However, on average, the algorithm performs much better due to the partitioning of the array around the pivot element, which allows for faster sorting.
*/
export function quickSort_simple(arr) {
    if (arr.length <= 1) return arr;
    let pivot = arr[0];
    let left = arr.filter(x => x < pivot);
    let right = arr.filter(x => x > pivot);
    return [...quickSort_simple(left), pivot, ...quickSort_simple(right)]
}