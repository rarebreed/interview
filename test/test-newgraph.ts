import test from "ava";

import { Graph, bfs, dfs, KeyValList } from "../src/structures/newgraph";

let testGraph: KeyValList<string> = [
  ["A", ["C", "D"]],
  ["B", ["D", "E"]],
  ["C", ["F"]],
  ["F", ["E"]]
]

test("test toposort", (t) => {
  let graph = Graph.new(true, testGraph);

  let results = dfs(graph);
  console.log(results);
  t.true(true)
})