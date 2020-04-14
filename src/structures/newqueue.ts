import { Option } from "../fn";

interface IndexedBuffer<T> {
  [key: number]: T
}

export class Queue<T> {
  queue: IndexedBuffer<T>
  head: number;
  tail: number;
  buffSize: number = 200;

  constructor(start?: T[]) {
    this.head = 0;
    this.tail = 0;
    this.queue = {};

    if (start) {
      start.forEach(i => this.enqueue(i))
    }
  }

  static new = <T>(init?: T[]) => {
    return new Queue(init)
  }

  enqueue = (item: T) => {
    this.queue[this.tail] = item;
    this.tail++;
  }

  dequeue = () => {
    const item = this.peek();
    if (item.isSome()) {
      delete this.queue[this.head]
      this.head++;
    }
    return item;
  }

  peek = () => {
    if (!this.isEmpty()) {
      return Option.Some(this.queue[this.head])
    } else {
      return Option.None<T>()
    }
  }

  isEmpty = () => this.head === this.tail;

  size = () => this.tail - this.head;
}

export class Dequeue<T> extends Queue<T> {
  addFront = (item: T) => {
    this.head--;
    this.queue[this.head] = item
  }

  removeBack = () => {
    let item = this.peekBack();
    if (item.isSome()) {
      this.tail--;
      delete this.queue[this.tail];
    }
    return item;
  }

  peekBack = () => {
    if (this.isEmpty()) {
      return Option.None<T>()
    } else {
      let item = this.queue[this.tail - 1];
      return Option.Some(item)
    }
  }
}