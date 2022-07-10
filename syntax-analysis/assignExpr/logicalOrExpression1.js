const BaseClass = require('../baseClass');
const LogicalAndExpression = require('./logicalAndExpression');

// <LogicalOrExpression1> ::= '||' <LogicalAndExpression> <LogicalOrExpression1> |

const OPERATORS = ['||'];
class LogicalOrExpression1 extends BaseClass {
  exec() {
    if (!this.isCloseBrackets(this.currentToken)) {
      const [foundAnd, endedTokens] = this.nextUntilOrOperator();

      if (foundAnd) {
        const logicalAndExpression = new LogicalAndExpression(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = logicalAndExpression.exec();

        const logicalOrExpression1 = new LogicalOrExpression1(this.tokens, this.currentIndex, this.errors);
        this.currentIndex = logicalOrExpression1.exec();
      }
    }

    return this.currentIndex;
  }

  nextUntilOrOperator() {
    return this.nextUntil(this.isOr, [LogicalAndExpression.isOnSetFirst, LogicalOrExpression1.isOnSetFirst, BaseClass.isDelimiter]);
  }

  static getSetFirst() {
    return OPERATORS;
  }

  static isOnSetFirst(token) {
    return LogicalOrExpression1.getSetFirst().includes(token.lexema);
  }
}

module.exports = LogicalOrExpression1;