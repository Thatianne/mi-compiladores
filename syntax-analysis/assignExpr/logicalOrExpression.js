const BaseClass = require('../baseClass');
const LogicalAndExpression = require('./logicalAndExpression');
const LogicalOrExpression1 = require('./logicalOrExpression1');

// <LogicalOrExpression> ::= <LogicalAndExpression> <LogicalOrExpression1>
class LogicalOrExpression extends BaseClass {
  exec() {
    if (LogicalAndExpression.isOnSetFirst(this.currentToken)) {
      const logicalAndExpression = new LogicalAndExpression(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = logicalAndExpression.exec();

      const logicalOrExpression1 = new LogicalOrExpression1(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = logicalOrExpression1.exec();
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return LogicalAndExpression.getSetFirst();
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, LogicalAndExpression.getSetFirst());
  }
}

module.exports = LogicalOrExpression;