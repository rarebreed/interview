import test from "ava";

import { mergeSort } from "../src/sorting/mergesort";
import { quickSort } from "../src/sorting/quicksort";
import { makeNumbers, pair } from "../src/fn";
import { defaultCompare } from "../src/types/types";

test("Tests that merge sort works", (t) => {

  const testVals = makeNumbers(10);

  let sorted = mergeSort(testVals, defaultCompare);
  let paired = pair(sorted);
  for (let [f, s] of paired) {
    t.true(f <= s, `${f} is not <= to ${s}>`)
  }
});

test("Tests that quick sort works", (t) => {

  const testVals = makeNumbers(10);

  let sorted = quickSort(testVals, defaultCompare);
  let paired = pair(sorted);
  for (let [f, s] of paired) {
    t.true(f <= s, `${f} is not <= to ${s}>`)
  }
});