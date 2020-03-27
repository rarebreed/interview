/**
 * Simple (double) linked list
 */
namespace Structures {
  class Node<T> {
    value: T;
    next: Node<T> | null;
    back: Node<T> | null;
  
    constructor(val: T) {
      this.value = val;
      this.next = null;
      this.back = null;
    }
  }

  class LinkedList<T> {
    push = (node: Node<T>) => {

    }

    insert = (node: Node<T>, pos: number) => {

    }

    getElement = (pos: number): Node<T> | null => {
      return null
    }

    remove = () => {

    }

    indexOff = () => {

    }

    removeAt = () => {

    }

    isEmpty = () => {

    }
  }
}

