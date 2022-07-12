const AddendOperator = require('../addendOperator/addendOperator');
const BaseClass = require('../baseClass');
const OperatorNotFound = require('../errors/operatorNotFound');
const TokenHelper = require('../tokenHelper');

// <LogicalExpression> ::= '||' <AddendOperator> | '&&' <AddendOperator>

const OPERATORS = ['||', '&&'];
class LogicalExpression extends BaseClass {
  exec() {
    if (TokenHelper.isOr(this.currentToken) || TokenHelper.isAnd(this.currentToken)) {
    let endedTokens = this.next();

    if (!endedTokens) {
      const addendOperator = new AddendOperator(this.tokens, this.currentIndex, this.errors);
      this.currentIndex = addendOperator.exec();
    }
  } else {
    this.addError(new OperatorNotFound(OPERATORS.join(', '), this.currentIndex, this.currentToken));
  }
    return this.currentIndex;
  }

  static getOperators() {
    return OPERATORS;
  }

  static getSetFirst() {
    return [TokenHelper.isOr, TokenHelper.isAnd];
  }

  static isOnSetFirst(token) {
    return BaseClass.processIsOnSetFirst(token, LogicalExpression.getSetFirst());
  }
}

module.exports = LogicalExpression;