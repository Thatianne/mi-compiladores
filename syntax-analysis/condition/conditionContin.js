const BaseClass = require('../baseClass');
const RelationalExpression = require('../expression/relationalExpression');
const LogicalExpression = require('../expression/logicalExpression');
const OperatorNotFound = require('../errors/operatorNotFound');

// <ConditionContin> ::= <RelationalExpression> | <LogicalExpression>
class ConditionContin extends BaseClass {
  exec() {
    if (RelationalExpression.isOnSetFirst(this.currentToken)) {
      const relationalExpression = new RelationalExpression(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = relationalExpression.exec();
    } else if (LogicalExpression.isOnSetFirst(this.currentToken)) {
      const logicalExpression = new LogicalExpression(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = logicalExpression.exec();
    } else {
      const allOperators = RelationalExpression.getSetFirst().concat(LogicalExpression.getSetFirst());
      this.addError(new OperatorNotFound(allOperators.join(', '), this.currentIndex, this.currentToken));
    }

    return this.currentIndex;
  }

  static getSetFirst() {
    return RelationalExpression.getSetFirst().concat(LogicalExpression.getSetFirst());
  }

  static isOnSetFirst(token) {
    return ConditionContin.getSetFirst().includes(token.lexema);
  }
}

module.exports = ConditionContin;