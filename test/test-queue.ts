import test from "ava";

import { Queue, Dequeue } from "../src/structures/queue";
import { Fn, toGen, take } from "../src/fn";

test("Tests Queue enque", (t) => {
  let q = new Queue<number>();
  q.enqueue(1);
  q.enqueue(2);

  t.true(q.peek() === 1, "enqueue failed");
  t.true(q.size() === 2, "size was wrong")
});

test("Tests Queue enque and dequeue", (t) => {
  let q = new Queue<number>();
  q.enqueue(1);
  q.enqueue(2);
  let head = q.dequeue();

  t.true(head == 1, "dequeue failed");
});

test("Tests Queue that is emptied", (t) => {
  let q = new Queue<number>();
  q.enqueue(1);
  q.enqueue(2);
  let head = q.dequeue();
  head = q.dequeue();

  t.true(head == 2, "dequeue failed");

  t.true(q.isEmpty(), "Queue was not emptied")
  t.assert(q.dequeue() === null, "Queue should be empty")
});

test("Initial queue", (t) => {
  const q = new Queue([1, 2, 3]);
  t.true(q.size() === 3, "Size did not add up")
})

test("Tests Dequeue add to front", (t) => {
  let dq = new Dequeue<number>();
  dq.enqueue(1);
  dq.addFront(2);

  t.true(dq.peek() === 2, "Add to front did not work")
});

test("Tests Dequeue peekBack", (t) => {
  let dq = new Dequeue<number>();
  dq.enqueue(1);
  dq.addFront(2);

  t.true(dq.peekBack() === 1, "Did not see back correctly");
});

test("Checks emptied out Dequeue", (t) => {
  let dq = new Dequeue<number>();
  dq.enqueue(1);
  dq.enqueue(2);
  dq.addFront(3);

  let size = dq.size();
  t.true(size === 3, "Incorrect size");

  let iter = Fn.new().range().take(size);
  for (let i of iter) {
    let item = dq.removeBack();
    // console.log(item);
  }

  t.true(dq.isEmpty(), "Queue was not emptied");

  t.true(dq.removeBack() === null, "removeBack should have returned null")
})

test("palindrome checker", (t) => {
  let gen = take(toGen("radar"))("radar".length);
  const dq = new Dequeue(gen);

  let palindrome = true;
  while (!dq.isEmpty()) {
    if (dq.size() === 1) {
      break;
    }
    let head = dq.dequeue();
    let tail = dq.removeBack();
    // console.log(`head = ${head} tail = ${tail}`)
    if (head !== tail) {
      palindrome = false;
      break;
    }

    if (head === null || tail === null) {
      palindrome = false;
      break
    }
  }

  t.true(palindrome, "Failed to test palindrome")
})