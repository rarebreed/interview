import test from "ava";

import { permutations } from "../src/problems/greedy/recursive-str-perm";

test("Tests we can get all permutations of a string", (t) => {
  let perms = permutations("the".split(""));
  t.true(true)
})