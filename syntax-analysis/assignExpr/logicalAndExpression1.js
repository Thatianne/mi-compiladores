const BaseClass = require('../baseClass');
const Condition = require('../condition/condition');

// <LogicalAndExpression1> ::= '&&' <Condition> <LogicalAndExpression1> |

const OPERATORS = ['&&'];
class LogicalAndExpression1 extends BaseClass {
  exec() {
    if (!this.isCloseBrackets(this.currentToken) || this.isAnd(this.currentToken)) {
      const [foundAnd, endedTokens] = this.nextUntilAndOperator();

      if (foundAnd) {
        const Condition = require('../condition/condition');
        const condition = new Condition(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = condition.exec();

        const logicalAndExpression1 = new LogicalAndExpression1(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = logicalAndExpression1.exec();
      }
    }

    return this.currentIndex;
  }

  nextUntilAndOperator() {
    return this.nextUntil(this.isAnd, [Condition.isOnSetFirst, LogicalAndExpression1.isOnSetFirst, BaseClass.isDelimiter]);
  }

  static getSetFirst() {
    return OPERATORS;
  }

  static isOnSetFirst(token) {
    return LogicalAndExpression1.getSetFirst().includes(token.lexema);
  }
}

module.exports = LogicalAndExpression1;