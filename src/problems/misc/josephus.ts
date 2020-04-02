import { Queue } from "../../structures/queue";
import { Fn } from "../../fn";

export const josephus = (start: number, rotate: number) => {
  let q = new Queue(Fn.new().range().take(start))
  
  while (q.size() !== 1) {
    for (let i = 0; i < rotate - 1; i++) {
      let item = q.dequeue();
      if (item) q.enqueue(item)
    }
    console.log("To be executed: ", q.dequeue())
  }
  return q
}