const AddendOperator = require('../addendOperator/addendOperator');
const BaseClass = require('../baseClass');
const OperatorNotFound = require('../errors/operatorNotFound');

/* <LogicalExpression> ::= '||' <AddendOperator>
                     | '&&' <AddendOperator>
*/
const OPERATORS = ['||', '&&'];
class LogicalExpression extends BaseClass {
  exec() {
    if (this.isOr(this.currentToken) || this.isAnd(this.currentToken)) {
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

  static getSetFirst() {
    return OPERATORS;
  }

  static isOnSetFirst(token) {
    return LogicalExpression.getSetFirst().includes(token.lexema);
  }
}

module.exports = LogicalExpression;