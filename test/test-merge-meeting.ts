import test from "ava";

import { mergeMeetings } from "../src/problems/arrays/meeting";
import { pair } from "../src/fn";

test("Tests merge of meetings", (t) => {
  const test = [
    { start: 0,  end: 1 },
    { start: 3,  end: 5 },
    { start: 4,  end: 8 },
    { start: 10, end: 12 },
    { start: 9,  end: 10 },
    { start: 5,  end: 7},
  ]
  
  const sorted = test.sort((a, b) => {
    return a.start - b.start
  });

  const result = mergeMeetings(sorted);
  // console.log(JSON.stringify(result, null, 2));

  const paired = pair(result);

  let res = paired
    .map(([first, second]) => {
      return first.end <= second.start
    })
    .reduce((acc, n) => {
      return acc && n
    })

  t.true(res, "End time of one meeting was greater than start of next")
})