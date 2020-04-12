import test from "ava";

import { Graph, KeyValType, dfs } from "../src/structures/graph";

let graph: KeyValType<number> = [
  [1, [3, 5, 9]],
  [2, [5, 7, 9]],
  [3, [4, 6]],
  [5, [7, 9]],
  [7, [8]]
]


// let res = bfs(g, 1);
// console.log(res)

test("Test that dfs discovers all vertices", (t) => {
  let g = Graph.new(false, graph);
  let s = dfs(g, (v) => console.log(`visiting ${v}`));
  console.log(s);
  
  let count = 0;
  while (!s.isEmpty()) {
    console.log(`popping ${s.pop()} off the stack`);
    count++;
  }

  t.true(count === 9);
})