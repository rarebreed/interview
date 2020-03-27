/**
 * Simple Queue data structure
 */

interface Items<T> {
  [key: number]: T
}

export class Queue<T> {
  protected tail: number;    // Points to the next _empty_ slot
  protected items: Items<T>; // Items in our container
  protected head: number;    // Points to the head of the line

  constructor(start: T[] = []) {
    this.tail = 0;
    this.head = 0;
    this.items = {}

    start.forEach(i => {
      this.enqueue(i)
    })
  }

  /** Add to the back, like a line */
  enqueue = (elm: T) => {
    this.items[this.tail] = elm;
    this.tail++;
  }

  /** 
   * Remove the front
   * 
   * We have to check if we are empty.  If we are empty (peek() returned null), don't do anything
   * other than return null back.  Otherwise, we need to decrement our head of the line, and delete
   * it from memory
   */
  dequeue = () => {
    let item = this.peek();
    if (item !== null) {
      delete this.items[this.head]
      this.head++;
    }
    return item;
  }

  peek = () => {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.head];
  }

  /**
   * Returns true or false depending on if the queue has no items
   * 
   * We determine that we have no items back looking to see if head === tail.  If they are, then we
   * know the queue is empty.  This is true, because the only way to add to head is to enqueue, and
   * the only way to remove from the queue, is to dequeue.  As we add items tail increases.  As we
   * remove items, head increases.  If we have removed the same amount as we added, head and tail
   * will equal each other.
   */
  isEmpty = () => {
    return this.head === this.tail;
  }

  size = () => {
    return this.tail - this.head
  }
}

export class Dequeue<T> extends Queue<T> {
  addFront = (elm: T) => {
    this.head--;
    this.items[this.head] = elm;
  }

  removeBack = () => {
    let item = this.peekBack();
    if (item !== null) {
      delete this.items[this.tail];
      this.tail--;
    }
    return item
  }

  peekBack = () => {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.tail - 1];
  }

  isEmpty = () => {
    // console.log(`head = ${this.head}, tail = ${this.tail}`);
    return this.tail === this.head
  }
}

/**
 * This is a special kind of Queue where the size is fixed.  This is opposite of a RingBuffer which
 * has LIFO properties.  
 */
class CircularQueue<T> extends Dequeue<T> {
  enqueue = () => {

  }
}