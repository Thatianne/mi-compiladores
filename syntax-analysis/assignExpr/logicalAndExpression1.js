const BaseClass = require('../baseClass');
const Condition = require('../condition/condition');
const TokenHelper = require('../tokenHelper');

// <LogicalAndExpression1> ::= '&&' <Condition> <LogicalAndExpression1> |

const OPERATORS = ['&&'];
class LogicalAndExpression1 extends BaseClass {
  exec() {
    if (!TokenHelper.isCloseBrackets(this.currentToken) || TokenHelper.isAnd(this.currentToken)) {
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
    return this.nextUntil(TokenHelper.isAnd, [Condition.isOnSetFirst, LogicalAndExpression1.isOnSetFirst, TokenHelper.isDelimiter]);
  }

  static getSetFirst() {
    return OPERATORS;
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, LogicalAndExpression1.getSetFirst());
  }
}

module.exports = LogicalAndExpression1;