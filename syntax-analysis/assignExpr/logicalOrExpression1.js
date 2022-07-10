const BaseClass = require('../baseClass');
const TokenHelper = require('../tokenHelper');
const LogicalAndExpression = require('./logicalAndExpression');

// <LogicalOrExpression1> ::= '||' <LogicalAndExpression> <LogicalOrExpression1> |

const OPERATORS = ['||'];
class LogicalOrExpression1 extends BaseClass {
  exec() {
    if (!TokenHelper.isCloseBrackets(this.currentToken)) {
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
    return this.nextUntil(TokenHelper.isOr, [LogicalAndExpression.isOnSetFirst, LogicalOrExpression1.isOnSetFirst, TokenHelper.isDelimiter]);
  }

  static getSetFirst() {
    return [TokenHelper.isOr];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, LogicalOrExpression1.getSetFirst());
  }
}

module.exports = LogicalOrExpression1;