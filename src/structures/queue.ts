/**
 * Simple Queue data structure
 */

interface Items<T> {
  [key: number]: T
}

export class Queue<T> {
  #count: number;
  #items: Items<T>;
  #current: number;

  constructor() {
    this.#count = 0;
    this.#current = 0;
    this.#items = {}
  }

  enqueue = (elm: T) => {
    this.#items[this.#count] = elm;
    this.#count++;
  }

  dequeue = (): T => {
    if (this.isEmpty()) {
      return null;
    }
    let item = this.#items[this.#current];
    this.#current++;
    
    return item;
  }

  peek = () => {

  }

  isEmpty = () => {
    return this.#current === this.#count;
  }
}