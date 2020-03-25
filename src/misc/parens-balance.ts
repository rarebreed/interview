/**
 * This code will check to see if there is a balanced set of parens, brackets or braces in a string
 * 
 * We use a stack here.  Every time we see an open symbol (, [, { we push it onto a stack.  When we
 * see the closing brace, we pop it off the stack.  If we have leftovers in the stack, or the stack
 * is empty and we get a closing symbol ), ], }, then we know it's not balanced
 */
import { Stack } from "../structures/stack";

type Symbol = "(" | "{" | "[";

export const balancer = (test: string) => {
  let parensStack = new Stack<string>();
  let braceStack = new Stack<string>();
  let bracketStack = new Stack<string>();
  let stack = new Stack<Stack<string>>()

  for(const item of test) {
    switch (item) {
      case "(":
        parensStack.push(item)
        break;
      case ")":
        if (parensStack.isEmpty()) {
          return false;
        }
        if (!bracketStack.isEmpty() || !braceStack.isEmpty()) {
          console.error("There is an open bracket or brace")
          return false;
        }
        parensStack.pop()
        break;
      case "[":
        bracketStack.push(item);
        break;
      case "]":
        if (bracketStack.isEmpty()) {
          return false;
        }
        if (!parensStack.isEmpty() || !braceStack.isEmpty()) {
          console.error("There is an open brace or parens")
          return false;
        }
        bracketStack.pop()
        break;
      case "{":
        braceStack.push(item)
        break;
      case "}":
        if (braceStack.isEmpty()) return false
        if (!bracketStack.isEmpty() || !parensStack.isEmpty()) {
          console.error("There is an open bracket or parens")
          return false;
        }
        braceStack.pop()
        break;
      default:
        continue
    }
  }

  return parensStack.isEmpty()
}

const test = "( here ([ is a { test } that ] should) work)"
const negtest = "( here ([ is a ) test { ] should) not work}"
console.log(balancer(test))