import test from "ava";

import { Utils, toGen, Fn, zip, pair, reverse } from "../src/fn";

test("tests factorial", (t) => {
  let res = Utils.factorial(4);
  t.true(res === 24, "factorial did not work")
});

test("tests factorial(1)", (t) => {
  t.true(Utils.factorial(1) === 1, "factorial(1) did not equal 1")
});

test ("tests factorial(0) is 1", (t) => {
  t.true(Utils.factorial(0) === 1, "factorial(0) was not 1")
})

test("tests that factorial of negative number throw error", (t) => {
  t.throws(
    () => { return Utils.factorial(-1) },
    { instanceOf: Error},
    "Passing in negative value did not throw error")
})

test("toGen creates a generator of a non-empty array", (t) => {
  let gen = toGen([1]);

  let val = gen.next();
  t.true(val.done === false, "iter result returned done was true");
  t.true(gen.next().done, "Generator is exhausted")
})

test("Tests that take with a smaller value than rage results in correct size", (t) => {
  let arr = Fn.new().range(3).take(2);

  t.true(arr.length === 2, `Size of array was ${arr.length}: ${arr}`)
})

test("Checks that zip of unequal sizes resuls in zipped of smallest size", (t) => {
  const zipped = zip([1, 2, 3, 4], toGen("abc"));
  let count = 0;
  for (const i of zipped) {
    count++;
  }

  t.true(count === 3, "Size of zipped was not 3")
})

test("Checks that zip where one iter is 0, the zipped is size 0", (t) => {
  const zipped = zip([1, 2, 3, 4], toGen(""));
  let count = 0;
  for (const i of zipped) {
    count++;
  }

  t.true(count === 0, "Size of zipped was not 0")
})

test("Tests that pairwise works on even sized array", (t) => {
  let paired = pair([1, 2, 3, 4]);
  t.true(paired.length === 3, `paired was not size 3 but ${paired.length}: ${paired}`)
});

test("Verifies reverse works", (t) => {
  let test1 = ["h", "e", "l", "l", "o"];
  let test2 = ["s", "e", "a", "n", " ", "t", "o", "n", "e", "r"]

  reverse(test1)
  reverse(test2, 5, 9)

  let str1 = test1.join("");
  let str2 = test2.join("");
  t.true(str1 === "olleh", `hello was not reversed: ${str1}`);
  t.true(str2 === "sean renot", `reverse in the middle didn't work: ${test2}`)

})