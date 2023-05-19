// Proper quickSort method
/*
The time complexity of this proper quick sort method is O(n log n) on average and O(n^2) in the worst case.
The worst case occurs when the partitioning always results in the largest or smallest element being selected as the pivot, which leads to unbalanced partitions and poor performance. 
However, the average case occurs when the pivot is chosen randomly or with a good strategy that results in balanced partitions, which leads to good performance. 
Overall, quick sort is a popular and efficient sorting algorithm.
*/
export function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) {
        return;
    }

    let pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);

    return arr;
}

function partition(arr, left, right) {
    let pivotValue = arr[right]
    let partitionIndex = left;
    
    for (let i = left; i < right; i++) {
        if (arr[i] < pivotValue) {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }

    swap(arr, right, partitionIndex);
    return partitionIndex;
}

function swap(arr, firstIndex, secondIndex) {
    if (firstIndex !== secondIndex){
        let temp = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = temp;    
    }
}
