/**
 * This code will check to see if there is a balanced set of parens, brackets or braces in a string
 * 
 * This is actually more complicated than it seems once you add extra container types.  The trick is
 * to use a stack of stacks.  
 */
import { Stack } from "../../structures/stack";

type Symbol = "(" | "{" | "[";

const matchSymToClose = (sym: string) => {
  switch (sym) {
    case "}":
      return "{";
    case "]":
      return "[";
    case ")":
      return "(";
    default:
      return null
  }
}

export const balancer = (test: string) => {
  let stack = new Stack<Stack<string>>();

  const getCurrentStackType = () => {
    let currentStack = stack.peek();
    if (currentStack) {
      let currentSymb = currentStack.peek();
      if (currentSymb) {
        return [currentSymb, currentStack] as [string, Stack<string>]
      }
    } else {
      console.log("Empty stack ", stack.isEmpty())
    }
  }

  /**
   * Find out what our current stack is.  Then check the following:
   * - Check if the stack is empty.
   *   - If it is, add a new stack of appropriate type
   * - Find out what our [symbol, currentStack] types are
   * - Check current symbol
   *   - If current symbol is an open symbol:
   *     - Compare the currentStack type
   *       - If current symbol same as stack type, push to current
   *       - If they are different, add new stack of sym type to stack
   *   - If current symbol is a close symbol
   *     - Compare to the currentStack type
   *       - If they are matching types, pop the currentStack
   *         - if the currentStack is empty, stack.pop() to remove current
   *       - If it's different, return false
   */
  const checkSymbol = (sym: string) => {
    if (stack.isEmpty()) {
      stack.push(new Stack([sym]));
    } else {
      // Find what our current stack is
      let current = getCurrentStackType();
      if (current) {
        let [symbol, currStack] = current;
        // Check if we have an opening symbol
        if ("({[".includes(sym)) {
          if (sym === symbol) {
            currStack.push(sym)
          } else {
            stack.push(new Stack([sym]))
          }
        } else if (")}]".includes(sym)) { // Check if we have closing symbol
          if (matchSymToClose(sym) === symbol) {
            currStack.pop();
            if (currStack.isEmpty()) {
              stack.pop();
            }
          } else {
            return "Error"
          }
        }
      } else {
        console.log("This shouldn't happen")
      }
    }
  }

  for(const item of test) {
    if (checkSymbol(item) === "Error") {
      return false;
    }
  }

  // At this point if no more symbols.  If stack is empty return true, else false
  return stack.isEmpty()
}

/**
 * Simpler version where it only tests parens
 */
const parensChecker = (input: string) => {
  const stack: string[] = []

  const checkSym = (sym: string) => {
    if (sym === "(") {
      stack.push(sym)
    } else if (sym === ")") {
      if (stack.length <= 0) {
        return "Error"
      }
      stack.pop()
    }
  }

  for (const s of input) {
    if (checkSym(s) === "Error") {
      return false;
    }
  }

  return stack.length === 0
}

enum Symbols {
  LEFT_PAREN     = '(',
  RIGHT_PAREN    = ')',
  LEFT_BRACE     = '{',
  RIGHT_BRACE    = '}',
  LEFT_BRACKET   = '[',
  RIGHT_BRACKET  = ']',
}

/**
 * Simpler version
 * 
 * @param s 
 */
export const isBalanced = (s: string) => {
  const stack = new Stack<string>();
  for (let i of s) {
    if (i == Symbols.LEFT_PAREN)   stack.push(Symbols.LEFT_PAREN);
    if (i == Symbols.LEFT_BRACE)   stack.push(Symbols.LEFT_BRACE);
    if (i == Symbols.LEFT_BRACKET) stack.push(Symbols.LEFT_BRACKET);

    if (i == Symbols.RIGHT_PAREN) {
        if (stack.isEmpty()) return false;
        if (stack.pop() != Symbols.LEFT_PAREN) return false;
    }

    else if (i == Symbols.RIGHT_BRACE) {
        if (stack.isEmpty()) return false;
        if (stack.pop() != Symbols.LEFT_BRACE) return false;
    }

    else if (i == Symbols.RIGHT_BRACKET) {
        if (stack.isEmpty()) return false;
        if (stack.pop() != Symbols.LEFT_BRACKET) return false;
    }
  }
  return stack.isEmpty();
}

const test = "( here ([ is a { test } that ] should) work)"
const negtest = "( here ([ is a ) test { ] should) not work}"
const negtest2 = "( here ([ is a { {  ) } } test { ] should) not work}"
const test2 = "( here ([ [] {{ ([ () ]) } ()} is a { test } that ] should) work)"
console.log(balancer(negtest2))

const testp = "(())(()())";
const testpneg = "(())())"
console.log(parensChecker(testpneg));