/*
The time complexity of bogo sort is extremely poor and can be considered O(n!) in the worst case, where n is the length of the input array. 
This is because bogo sort generates random permutations of the input array until it happens to generate a sorted permutation, and the number of possible permutations of an array of length n is n!, so in the worst case, it could potentially take n! iterations to sort the array.
In practice, however, bogo sort is not used because it is highly inefficient and has no practical use.
*/

export function bogoSort(arr) {
    while (!sorted(arr)) {
        arr = shuffle(arr);
    }
    return arr;
}

function shuffle(arr) {
    let m = arr.length,
    t,
    i;

    while (m) {
        i = Math.floor(Math.random() * m--);

        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
    return arr;
}

function sorted(arr){
    let sorted = true;

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] < arr[i]) {
            sorted = false;
        }
    }
    return sorted;
}