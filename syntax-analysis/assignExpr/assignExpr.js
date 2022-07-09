const BaseClass = require('../baseClass');
const LogicalOrExpression = require('./logicalOrExpression');

// <AssignExpr> ::= <LogicalOrExpression> |
class AssignExpr extends BaseClass {
  exec() {
    if (LogicalOrExpression.isOnSetFirst(this.currentToken)) {
      const logicalOrExpression = new LogicalOrExpression(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = logicalOrExpression.exec();
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return LogicalOrExpression.getSetFirst();
  }

  static isOnSetFirst(token) {
    return AssignExpr.getSetFirst().includes(token.lexema);
  }
}

module.exports = AssignExpr;