import test from "ava";

import { range, take } from "../src/fn";
import { reverseWords } from "../src//problems/arrays/reverse-words";

test("Check that we can reverse an array of words", (t) => {
  const test = [ 
    "s", "o", "l", "v", "e", " ",
    "t", "h", "e", " ",
    "p", "r", "o", "b", "l", "e", "m"
  ];

  const answer = "problem ".split("").concat("the ".split("")).concat("solve".split(""))
  let words = reverseWords(test);
  
  for (let i = 0; i < answer.length; i++) {
    t.true(answer[i] === words[i])
  }
});