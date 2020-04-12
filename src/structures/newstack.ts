import { Option } from "../fn";

export class Stack<T> {
  stack: T[];
  top: number;

  constructor() {
    this.stack = [];
    this.top = 0;
  }

  push = (elem: T) => {
    this.stack.push(elem);
    this.top++;
  }

  pop = () => {
    if (this.top > 0) {
      this.top--;
      return Option.Maybe(this.stack.pop());
    } else {
      return Option.None<T>();
    }
  }

  peek = () => {
    if (this.stack.length === 0) return Option.None<T>()
    else return Option.Some(this.stack[this.stack.length - 1])
  }

  isEmpty = () => this.stack.length === 0;

  clear = () => {
    this.stack = [];
    this.top = 0;
  }

  size = () => this.stack.length;
}