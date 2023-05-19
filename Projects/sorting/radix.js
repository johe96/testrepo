/*
The time complexity of the radix sort algorithm is O(kn), where k is the maximum number of digits in the input array elements, and n is the length of the input array.
In your implementation, you first iterate through the input array to find the maximum number of digits, which takes O(n) time.
Then you have an outer loop that iterates up to the maximum number of digits, which is k. Inside this loop, you create 10 buckets and iterate through the input array to distribute each element into its corresponding bucket based on the current digit. 
This takes O(n) time, since you're iterating through each element once.
Finally, you concatenate the elements in the buckets to form the sorted array. This concatenation takes O(n) time since you're iterating through each element once.
Therefore, the total time complexity of the algorithm is O(kn).

*/

export function radixSort(arr) {
    let maxDigits = 0;

    for (let i = 0; i < arr.length; i++) {
        maxDigits = Math.max(maxDigits, getNumberOfDigits(arr[i]));
    }

    for (let i = 0; i < maxDigits; i++) {
        let buckets = Array.from({ length: 10 }, () => []);

        for (let j = 0; j < arr.length; j++) {
            let digit = getDigit(arr[j], i);
            buckets[digit].push(arr[j]);
        }

        arr = [].concat(...buckets);



    }
    return arr;
}

function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function getNumberOfDigits(num) {
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}