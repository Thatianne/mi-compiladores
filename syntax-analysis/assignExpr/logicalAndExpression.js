const BaseClass = require('../baseClass');
const Condition = require('../condition/condition');

// <LogicalAndExpression> ::= <Condition> <LogicalAndExpression1>
class LogicalAndExpression extends BaseClass {
  exec() {
    if (Condition.isOnSetFirst(this.currentToken)) {
      const condition = new Condition(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = condition.exec();

      const LogicalAndExpression1 = require('./logicalAndExpression1');
      const logicalAndExpression1 = new LogicalAndExpression1(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = logicalAndExpression1.exec();
    }
    return this.currentIndex;
  }

  static getSetFirst() {
    return Condition.getSetFirst();
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, Condition.getSetFirst());
  }
}

module.exports = LogicalAndExpression;