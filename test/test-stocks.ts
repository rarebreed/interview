import test from "ava";

import { maxDiff } from "../src/problems/greedy/stock";

test("Tests we get max value from buying stock", (t) => {
  let test = [10, 7, 5, 8, 11, 9];
  let ans = maxDiff(test);
  t.true(ans === 6, "Did not calculate correct amount");

  let test2 = [10, 11, 8, 7, 9, 5];
  ans = maxDiff(test2);
  t.true(ans === 2, "Did not calculate correct amount");

  let test3 = [12, 11, 10, 9, 8, 7];
  t.true(maxDiff(test3) === 0, "Should have been no profit")
});