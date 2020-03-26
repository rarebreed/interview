/**
 * Simple stack based data structure
 */

export class Stack<T> {
  #stack: T[];
  #top: number;

  constructor(start: T[] = []) {
    this.#stack = start;
    this.#top = this.#stack.length -1;
  }

  push = (elm: T) => {
    this.#top++;
    this.#stack.push(elm);
  }

  pop = () => {
    if (this.#top >= 0) {
      this.#top--;
    }
    return this.#stack.pop()
  }

  peek = () => {
    if (this.#top < 0) {
      return null
    }
    return this.#stack[this.#top]
  }

  isEmpty = () => {
    return this.#stack.length === 0
  }

  clear = () => {
    this.#stack = []
  }

  size = () => {
    return this.#stack.length
  }
}