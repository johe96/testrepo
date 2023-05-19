/*-------------------------------------------------------------------------------------------------

All code is based on the Youtube video from Beyond Fireship 'Sorting Algorithms Explained Visually'
Link: https://www.youtube.com/watch?v=RfXt_qHDEPw

--------------------------------------------------------------------------------------------------*/

import { bubbleSort } from "./bubble.js";
import { insertionSort } from "./insertion.js";
import { selectionSort } from "./selection.js";
import { mergeSort } from "./merge.js";
import { quickSort } from "./quick.js";
import { quickSort_simple } from "./quick_simple.js";
import { radixSort } from "./radix.js";
import { bogoSort } from "./bogo.js";

function testSortingFunctions(sortFunctions, arr) {
    for (const sortFunction of sortFunctions) {
        const start = Date.now();
        const sortedArr = sortFunction(arr.slice());
        const end = Date.now();
        const timeTaken = end - start;
        console.log(`${sortFunction.name} sorted array: ${sortedArr} (took ${timeTaken}ms)`);
    }
}

const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
const sortFunctions = [bubbleSort, insertionSort, selectionSort, mergeSort, quickSort, quickSort_simple, radixSort, bogoSort];
testSortingFunctions(sortFunctions, arr);
