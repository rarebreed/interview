# Lesson plan

Here's the overall strategy for studying CS 101 basics

## Data Structures

The main reason we learn about data structures is because certain data types are better for solving
problems than others.  For example, you can use a Dequeue for solving the palindrome problem quite
easily.  Detecting anagrams is easy with a HashMap (or other associative array).  Graphs are good at
solving many kinds of routing problems.  Determining optimal ordering is good with priority queues.

Indeed, these structures were invented often to help solve certain kinds of problems that simple
arrays could not solve, were not efficient at solving, or provided a certain API to control access
(for example, stacks and queues are often built on top of arrays).

We shall go over the following data structures, and implement them to understand why they exist

- stacks
- queues: Queue, Dequeue, CircularQueue, RingBuffer
- lists: LinkedList, DoubleLinkedList, SkipList
- trees: BST, BTree, Heap, Trie
- graphs:
- sets:
- maps

## Algorithms and Problems

Beyond data structures, we also need to learn about general patterns to solve various problems.
Algorithmic analysis is the study of how complex a solution is with regards to either space or time.
Some algorithms make tradeoffs: spend more memory to reduce time, or spend more time to reduce
memory.  Very often we want a solution that takes the least amount of operations and requires the
least amount of memory to use.

Some solutions often have in-place techniques, but this may or may not be a good thing.  While this
often reduces memory needs since you don't need to allocate new memory, this can be bad in a multi
threaded environment where multiple threads might be looking at the same memory.  For example, the
merge sort algorithm divides or slices an array, and then recombines the solution into a new array.
This doubles the amount of memory required.  On the other hand, merge sort is very conducive to a
multi threaded solution, since each splitting of the array is independent of each other.

Algorithm analysis goes hand in hand with certain problem solving techniques.  These techniques
includes but is not limited to:

- Recursion
- Divide and Conquer
- Dynamic Programming
- Greedy algorithms
- Backtracking/Tracking

We shall go over examples of each of the above.

## Study list

